import { Request, Response } from "express";
import catchAsync from "../../../sheared/catchAsync";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import { DoctorScheduleService } from "./doctorSchedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
 
  const result = await DoctorScheduleService.insertIntoDB(user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Doctor Schedule Created successfully",
    data: result,
  });
});

export const DoctorScheduleController = {
  insertIntoDB,
};
