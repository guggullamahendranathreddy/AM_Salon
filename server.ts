import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// In-Memory Rate Limiting Setup
interface RateLimitConfig {
  windowMs: number;
  max: number;
}

const rateLimiters: Record<string, { timestamps: number[] }> = {};

function createRateLimiter(config: RateLimitConfig) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Basic IP detection (handles direct & proxied headers)
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() || req.socket.remoteAddress || "anonymous";
    const now = Date.now();
    const windowStart = now - config.windowMs;

    if (!rateLimiters[ip]) {
      rateLimiters[ip] = { timestamps: [] };
    }

    // Clean up expired timestamps
    rateLimiters[ip].timestamps = rateLimiters[ip].timestamps.filter(ts => ts > windowStart);

    if (rateLimiters[ip].timestamps.length >= config.max) {
      res.status(429).json({
        error: "Too Many Requests",
        message: "You have exceeded our booking limit. Please wait a status window of 1 minute and try again, or call us directly."
      });
      return;
    }

    rateLimiters[ip].timestamps.push(now);
    next();
  };
}

// Global In-Memory Store for active/pending reservations during server lifecycle
const reservationStore: Array<{
  id: string;
  branch?: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  timestamp: string;
}> = [];

// Appointment Booking API with a rate limit of 3 bookings per IP per minute
app.post(
  "/api/book",
  createRateLimiter({ windowMs: 60 * 1000, max: 3 }),
  (req, res) => {
    const { branch, name, phone, service, date, time, notes } = req.body;

    if (!name || !phone || !service || !date || !time) {
      res.status(400).json({ error: "Missing fields", message: "Please fill in all required fields." });
      return;
    }

    // Capture booking
    const bookingId = "AK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const newReservation = {
      id: bookingId,
      branch: branch || "Nallagandla",
      name,
      phone,
      service,
      date,
      time,
      notes: notes || "",
      timestamp: new Date().toISOString(),
    };

    reservationStore.push(newReservation);

    // Prepare response, including formatted messages
    res.status(200).json({
      success: true,
      bookingId,
      message: "Appointment details compiled! Launching WhatsApp...",
      reservation: newReservation,
    });
  }
);

// General Query / Contact API with limited submissions
app.post(
  "/api/contact",
  createRateLimiter({ windowMs: 60 * 1000, max: 5 }),
  (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !message) {
      res.status(400).json({ error: "Missing fields", message: "Name and message are required." });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Your message has been received! Our support representative will contact you shortly."
    });
  }
);

// API to load metrics
app.get("/api/metrics", (req, res) => {
  res.json({
    activeReservations: reservationStore.length,
    activeRating: 4.9,
    ratingCount: 409
  });
});

// Real MongoDB Database & Production Routes
import { connectDB } from "./server/db";
import authRoutes from "./server/routes/authRoutes";
import blogRoutes from "./server/routes/blogRoutes";
import uploadRoutes from "./server/routes/uploadRoutes";

// Support both /api/* and /* for local & Vercel serverless function routing
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/blogs", blogRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/upload", uploadRoutes);



async function startServer() {
  // Connect to MongoDB
  await connectDB();

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEV mode with Vite middleware...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AM Unisex Salon server running successfully on port ${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
