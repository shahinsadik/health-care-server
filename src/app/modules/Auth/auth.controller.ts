import catchAsync from "../../../sheared/catchAsync";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
  });
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User login successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User login successfully",
    data: result
    // data: {
    //   accessToken: result.accessToken,
    //   needPasswordChange: result.needPasswordChange,
    // },
  });
});
export const AuthController = { loginUser , refreshToken};
