import { UserRole } from "../src/generated/prisma";
import prisma from "../src/sheared/prisma";
import * as bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  try {
    const isExistsSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });
    if (isExistsSuperAdmin) {
      console.log("Super admin already exists.");
      return;
    }
    const hashedPassword = await bcrypt.hash("123456", 12);
    const superAdminData = await prisma.user.create({
      data: {
        email: "shahinsadik@gmail.com",
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Shahin Sadik",
            // email: "shahinsadik1@gmail.com"
            contactNumber: "014004111124",
          },
        },
      },
    });
    console.log("Super admin seeded successfully.", superAdminData);
  } catch (error) {
    console.error("Error seeding super admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
