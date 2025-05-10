import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { UserStatus } from "../../../generated/prisma";
import { jwtHelper } from "../../../helpers/jwtHelper";

import prisma from "../../../sheared/prisma";
import bcrypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
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
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedToken;
  try {
    decodedToken = jwtHelper.verifyToken(token, config.jwt.refresh_token_secret as Secret);
  } catch (err) {
    throw new Error("You are Not Authorized");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedToken.email,
      status: UserStatus.ACTIVE,
    },
  });
  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefghijklmnop",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthService = { loginUser, refreshToken };
