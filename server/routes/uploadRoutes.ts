import { Router, Response } from "express";
import multer from "multer";
import { requireAdmin, AuthRequest } from "../middleware/auth";
import { uploadBufferToCloudinary, isCloudinaryConfigured } from "../cloudinary";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});

// POST /api/upload (Admin only)
router.post(
  "/",
  requireAdmin,
  upload.single("image"),
  async (req: AuthRequest, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: "Missing file",
        message: "Please select an image file to upload.",
      });
      return;
    }

    if (!isCloudinaryConfigured) {
      res.status(503).json({
        success: false,
        error: "Cloudinary not configured",
        message:
          "Cloudinary credentials missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env or Vercel dashboard.",
      });
      return;
    }

    try {
      const result = await uploadBufferToCloudinary(req.file.buffer);

      res.status(200).json({
        success: true,
        message: "Image uploaded successfully to Cloudinary.",
        url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    } catch (err: unknown) {
      console.error("Cloudinary upload error:", err);
      const errorMsg = err instanceof Error ? err.message : "Image upload failed";
      res.status(500).json({
        success: false,
        error: "Upload failed",
        message: errorMsg,
      });
    }
  }
);

export default router;
