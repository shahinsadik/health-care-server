import { Request, Response } from "express";
import catchAsync from "../../../sheared/catchAsync";
import prisma from "../../../sheared/prisma";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import { IAuthUser } from "../../interfaces/common";
import { ReviewService } from "./review.service";
import pick from "../../../sheared/pick";
import { reviewFilterableFields } from "./review.constant";

const insertIntoDB = catchAsync(async (req:Request & { user?: IAuthUser }, res:Response) => {

    const user = req.user;
    const result = await ReviewService.insertIntoDB(user as IAuthUser, req.body);
    
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Prescription inserted successfully",
      data: result,
    });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, reviewFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await ReviewService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Reviews retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});
export const ReviewController = {insertIntoDB,getAllFromDB}