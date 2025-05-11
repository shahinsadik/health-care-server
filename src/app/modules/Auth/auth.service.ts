import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { UserStatus } from "../../../generated/prisma";
import { jwtHelper } from "../../../helpers/jwtHelper";
import prisma from "../../../sheared/prisma";
import bcrypt from "bcrypt";
import emailSender from "./emailSender";
import ApiError from "../../errors/ApiError";
import status from "http-status";

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
  await emailSender(
    userData.email,
    `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <h2 style="color: #2e7d32;">SS Health Care</h2>
      <p style="font-size: 16px; color: #555555;">
        Dear User,<br><br>
        We received a request to reset your password for your SS Health Care account. Click the button below to proceed:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetPassLink}" style="text-decoration: none;">
          <button style="
            background-color: #2e7d32;
            color: white;
            padding: 14px 28px;
            font-size: 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          ">
            Reset Password
          </button>
        </a>
      </div>
      <p style="font-size: 14px; color: #999999;">
        If you did not request this, please ignore this email or contact our support team.
      </p>
      <p style="font-size: 14px; color: #999999; margin-top: 40px;">
        Best regards,<br/>
        <strong>SS Health Care Support Team</strong>
      </p>
    </div>
  </div>
  `
  );
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });
  const isValidToken = jwtHelper.verifyToken(
    token,
    config.jwt.reset_pass_secrect as Secret
  );
  if(!isValidToken){
    throw new ApiError(status.FORBIDDEN, "Forbidden")
  }
  //hashed password
  //update password 
  //
  console.log(isValidToken);
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
