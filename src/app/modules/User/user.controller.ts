import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../sheared/catchAsync";
import pick from "../../../sheared/pick";
import { userFilterableField, userSearchableFields } from "./user.const";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.createAdmin(req);

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Failed to create admin",
      error: err,
    });
  }
};
const createDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.createDoctor(req);

    res.status(200).json({
      success: true,
      message: "Doctor created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Failed to create Doctor",
      error: err,
    });
  }
};
const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await UserService.createPatient(req);

    res.status(200).json({
      success: true,
      message: "Patient created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.name || "Failed to create Patient",
      error: err,
    });
  }
};
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableField);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Get all User Successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
};
