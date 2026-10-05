import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name: string;
  };
}

export const JWT_SECRET =
  process.env.JWT_SECRET || "am-unisex-salon-super-secure-jwt-secret-key-2026";

export function generateToken(user: {
  _id: string | unknown;
  email: string;
  role: string;
  name: string;
}): string {
  return jwt.sign(
    {
      id: String(user._id),
      email: user.email,
      role: user.role,
      name: user.name,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Authentication token missing or invalid.",
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
      name: string;
    };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Session token expired or invalid. Please log in again.",
    });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  requireAuth(req, res, () => {
    if (req.user?.role !== "admin") {
      res.status(403).json({
        success: false,
        error: "Forbidden",
        message: "Admin privileges are strictly required to perform this action.",
      });
      return;
    }
    next();
  });
}
