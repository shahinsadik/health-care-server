import { Request, Response } from "express";
import catchAsync from "../../../sheared/catchAsync";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import { PrescriptionService } from "./prescription.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../sheared/pick";

const insertIntoDb = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await PrescriptionService.insertIntoDb(
      user as IAuthUser,
      req.body
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Prescription inserted successfully",
      data: result,
    });
  }
);

const patientPrescription = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const options = pick(req.query, ["sortBy", "limit", "page", "sortOrder"]);
    const result = await PrescriptionService.patientPrescription(
      user as IAuthUser, options
    );
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Prescription fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const PrescriptionController = { insertIntoDb, patientPrescription };
