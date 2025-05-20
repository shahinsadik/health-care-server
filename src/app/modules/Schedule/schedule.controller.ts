import { Request, Response } from "express";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import catchAsync from "../../../sheared/catchAsync";
import { ScheduleService } from "./schedule.service";
import pick from "../../../sheared/pick";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ScheduleService.insertIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Schedule Created successfully",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ["startDate", "endDate"]);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await ScheduleService.getAllFromDB(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Schedule fetched successfully",
    data: result,
  });
});
export const ScheduleController = {
  insertIntoDB,
  getAllFromDB,
};
