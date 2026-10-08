import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import authRoutes from "./routes/authRoutes";
import blogRoutes from "./routes/blogRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();

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
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() || req.socket.remoteAddress || "anonymous";
    const now = Date.now();
    const windowStart = now - config.windowMs;

    if (!rateLimiters[ip]) {
      rateLimiters[ip] = { timestamps: [] };
    }

    rateLimiters[ip].timestamps = rateLimiters[ip].timestamps.filter(ts => ts > windowStart);

    if (rateLimiters[ip].timestamps.length >= config.max) {
      res.status(429).json({
        error: "Too Many Requests",
        message: "You have exceeded our booking limit. Please wait 1 minute and try again."
      });
      return;
    }

    rateLimiters[ip].timestamps.push(now);
    next();
  };
}

// In-Memory Reservation Tracking
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

// Appointment Booking API
app.post(
  ["/api/book", "/book"],
  createRateLimiter({ windowMs: 60 * 1000, max: 3 }),
  (req, res) => {
    const { branch, name, phone, service, date, time, notes } = req.body;

    if (!name || !phone || !service || !date || !time) {
      res.status(400).json({ error: "Missing fields", message: "Please fill in all required fields." });
      return;
    }

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

    res.status(200).json({
      success: true,
      bookingId,
      message: "Appointment details compiled! Launching WhatsApp...",
      reservation: newReservation,
    });
  }
);

// General Query / Contact API
app.post(
  ["/api/contact", "/contact"],
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

// Metrics API
app.get(["/api/metrics", "/metrics"], (req, res) => {
  res.json({
    activeReservations: reservationStore.length,
    activeRating: 4.9,
    ratingCount: 409
  });
});

// Real Production Routes - Support both /api/* and /* paths
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

app.use("/api/blogs", blogRoutes);
app.use("/blogs", blogRoutes);

app.use("/api/upload", uploadRoutes);
app.use("/upload", uploadRoutes);

// Healthcheck
app.get(["/api/health", "/health", "/api"], (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "AM Unisex Salon API",
    timestamp: new Date().toISOString()
  });
});

export default app;
