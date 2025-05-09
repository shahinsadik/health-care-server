import prisma from "../../../sheared/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isPasswordValid: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijklmnop",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  const refreshToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijklmnopq",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthService = { loginUser };
