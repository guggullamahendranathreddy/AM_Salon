import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { connectDB } from "../db";
import { User } from "../models/User";
import { generateToken, requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Missing credentials",
      message: "Both email and password are required.",
    });
    return;
  }

  try {
    const conn = await connectDB();
    if (!conn) {
      res.status(503).json({
        success: false,
        error: "Database unavailable",
        message: "Database is not connected. Please set MONGODB_URI in your environment variables.",
      });
      return;
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials",
        message: "Invalid email or password.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials",
        message: "Invalid email or password.",
      });
      return;
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Authentication successful.",
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
      message: "An internal error occurred during login. Please try again.",
    });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await connectDB();
    const user = await User.findById(req.user?.id).select("-passwordHash");
    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
      return;
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error("Auth me error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

export default router;
