import { NextFunction, Request, Response } from "express";
import pick from "../../../sheared/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";

const getAllFromDB = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log("filters", options);
    const result = await AdminService.getAllFromDB(filters, options);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Get all Admin from DB Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
   next(err);
  }
};

const getByIdFromDB = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { id } = req.params;

    const result = await AdminService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: `Get Admin Successfully. ID: ${id}`,
      data: result,
    });
  } catch (err: any) {
    next(err);

  }
};

const updateIntoDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await AdminService.updateIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: `Updated Admin Successfully`,
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const deleteFromDB = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await AdminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: `Admin Delete Successfully`,
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
const softDeleteFromDB = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: `Soft deleted Admin Successfully`,
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
