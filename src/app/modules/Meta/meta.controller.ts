import status from "http-status";
import catchAsync from "../../../sheared/catchAsync";
import sendResponse from "../../../sheared/sendResponse";
import { MetaService } from "./meta.service";
import { Request, Response } from "express";
import { IAuthUser } from "../../interfaces/common";

const fetchDashboardMeta = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await MetaService.fetchDashboardMeta(user as IAuthUser);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Meta data fetched successfully",
      data: result,
    });
  }
);


export const MetaController = {
  fetchDashboardMeta,
};
