import { Request, Response } from "express";
import catchAsync from "../../../sheared/catchAsync";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import { PrescriptionService } from "./prescription.service";
import { IAuthUser } from "../../interfaces/common";

const insertIntoDb = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.insertIntoDb(user as IAuthUser, req.body);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Prescription inserted successfully",
      data: result,
    });
  }
);

export const PrescriptionController = { insertIntoDb };
