import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { connectDB } from "./db";
import { User } from "./models/User";

dotenv.config();

async function seedAdmin() {
  console.log("=== AM Unisex Salon • Admin Initialization Script ===");

  const name = process.env.ADMIN_NAME || "AM Salon Admin";
  const email = (process.env.ADMIN_EMAIL || "admin@amsalon.com").toLowerCase().trim();
  const rawPassword = process.env.ADMIN_PASSWORD || "amsalon123";

  if (!rawPassword) {
    console.error("❌ Error: ADMIN_PASSWORD environment variable is required.");
    process.exit(1);
  }

  const conn = await connectDB();
  if (!conn) {
    console.error("❌ Error: Could not connect to MongoDB. Please ensure MONGODB_URI is set in .env");
    process.exit(1);
  }

  try {
    const existing = await User.findOne({ email });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    if (existing) {
      existing.name = name;
      existing.passwordHash = passwordHash;
      existing.role = "admin";
      await existing.save();
      console.log(`✅ Admin account updated successfully: ${email}`);
    } else {
      const newUser = new User({
        name,
        email,
        passwordHash,
        role: "admin",
      });
      await newUser.save();
      console.log(`✅ Admin account created successfully: ${email}`);
    }

    console.log("--------------------------------------------------");
    console.log(`Email:    ${email}`);
    console.log(`Role:     admin`);
    console.log(`Password: [SECURELY HASHED WITH BCRYPT]`);
    console.log("--------------------------------------------------");
    console.log("Admin initialization complete. You can now log into /#admin");
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to seed admin user:", err);
    process.exit(1);
  }
}

seedAdmin();
