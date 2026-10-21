import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const seedDefaultAdmin = async () => {
  try {
    const defaultAdmins = [
      {
        email: "admin@ietlucknow.ac.in",
        name: "Default Admin",
        password: "admin123",
      },
      {
        email: "admin1@ietlucknow.ac.in",
        name: "Admin 1",
        password: "admin123",
      },
      {
        email: "admin@flasheats.com",
        name: "FlashEats Admin",
        password: "admin123",
      },
      {
        email: "canteen@ietlucknow.ac.in",
        name: "Canteen Admin",
        password: "admin123",
      },
    ];

    for (const adminData of defaultAdmins) {
      const existingUser = await User.findOne({ email: adminData.email });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        const newAdmin = new User({
          name: adminData.name,
          email: adminData.email,
          password: hashedPassword,
          role: "admin",
          isVerified: true,
        });
        await newAdmin.save();
        console.log(`Default admin created: ${adminData.email} (password: ${adminData.password})`);
      } else {
        // Ensure user has admin role and a valid hashed password
        const hashedPassword = await bcrypt.hash(adminData.password, 10);
        existingUser.password = hashedPassword;
        existingUser.role = "admin";
        existingUser.isVerified = true;
        await existingUser.save();
        console.log(`Admin account confirmed: ${adminData.email} (password: ${adminData.password})`);
      }
    }
  } catch (error) {
    console.error("Error seeding default admin:", error.message);
  }
};
