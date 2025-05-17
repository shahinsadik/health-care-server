import { Request, Response } from "express";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import catchAsync from "../../../sheared/catchAsync";
import { ScheduleService } from "./schedule.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Schedule Created successfully",
    data: result,
  });
});

export const ScheduleController = {
  insertIntoDB,
};
