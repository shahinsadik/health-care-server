import { Request, Response } from "express";
import pick from "../../../sheared/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import catchAsync from "../../../sheared/catchAsync";

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
 
  const result = await AdminService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Get all Admin from DB Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Get Admin Successfully. ID: ${id}`,
    data: result,
  });
});

const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Updated Admin Successfully`,
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Admin Delete Successfully`,
    data: result,
  });
});
const softDeleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AdminService.softDeleteFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Soft deleted Admin Successfully`,
    data: result,
  });
});
export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
