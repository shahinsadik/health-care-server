
import { Request, Response } from "express";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import catchAsync from "../../../sheared/catchAsync";
import { SpecialtiesService } from "./Specialties.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.insertIntoDB(req);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Specialties Created successfully",
    data: result,
  });
});

export const SpecialtiesController = {
  insertIntoDB,
};
