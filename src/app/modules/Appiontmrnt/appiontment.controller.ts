import { Request, Response } from "express";
import catchAsync from "../../../sheared/catchAsync";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import { AppointmentService } from "./appiontment.service";
import { IAuthUser } from "../../interfaces/common";



const createAppointment = catchAsync(async (req: Request & {user?: IAuthUser}, res: Response) => {
    const user = req.user;
  const result = await AppointmentService.createAppointment(user as IAuthUser, req.body);

  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Appointment Booked successfully",
    data: result,
  });
});

export const AppointmentController = {createAppointment}