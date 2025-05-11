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
  const isCarrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCarrectPassword) {
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
    decodedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );
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
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCarrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCarrectPassword) {
    throw new Error("Invalid password");
  }
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.updateMany({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });
  return "Password Change successfully";
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const resetPassToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_pass_secrect as Secret,
    config.jwt.reset_pass_expires_in as string
  );

  const resetPassLink =
    config.reset_password_link +
    `?userId=${userData.id}&token=${resetPassToken}`;
  console.log(resetPassLink);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
};
