import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

export function uploadBufferToCloudinary(
  buffer: Buffer,
  folder = "am-unisex-salon/blogs"
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      reject(
        new Error(
          "Cloudinary credentials missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        )
      );
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Cloudinary upload failed"));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(buffer);
  });
}

export default cloudinary;
