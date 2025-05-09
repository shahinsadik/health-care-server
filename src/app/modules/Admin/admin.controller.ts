import { Request, Response } from "express";

import pick from "../../../shared/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminService } from "./admin.service";
import { log } from "console";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    console.log("filters", options);
    const result = await AdminService.getAllFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Get all Admin from DB Successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get all Admin from DB",
      error: err.message,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await AdminService.getByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: `Get Admin Successfully. ID: ${id}`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to get Admin",
      error: err.message,
    });
  }
};

const updateIntoDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    log("updateIntoDB", req.params, req.body);
    const result = await AdminService.updateIntoDB(id, req.body);
    res.status(200).json({
      success: true,
      message: `Updated Admin Successfully`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update Admin",
      error: err.message,
    });
  }
};
const deleteFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.deleteFromDB(id);
    res.status(200).json({
      success: true,
      message: `Admin Delete Successfully`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Admin",
      error: err.message,
    });
  }
};
const softDeleteFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await AdminService.softDeleteFromDB(id);
    res.status(200).json({
      success: true,
      message: `Soft deleted Admin Successfully`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to soft delete Admin",
      error: err.message,
    });
  }
};
export const AdminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
