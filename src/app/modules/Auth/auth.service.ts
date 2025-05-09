import { jwtHelper } from "../../../helpers/jwtHelper";
import prisma from "../../../sheared/prisma";
import bcrypt from "bcrypt";

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
  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijklmnop",
    "5m"
  );

  const refreshToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijklmnopq",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthService = { loginUser };
