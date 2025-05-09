import catchAsync from "../../../sheared/catchAsync";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User login successfully",
    data: result,
  });
});
export const AuthController = { loginUser };
