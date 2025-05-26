import { Request, Response } from "express";
import catchAsync from "../../../sheared/catchAsync";
import sendResponse from "../../../sheared/sendResponse";
import status from "http-status";
import { PaymentService } from "./payment.service";


const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentId } = req.params;
 
  const result = await PaymentService.initPayment(appointmentId);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Your Payment Initiate successfully",
    data: result,
  });
});
const validatePayment = catchAsync(async (req: Request, res: Response) => {
 
 
  const result = await PaymentService.validatePayment(req.query);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Your Payment Validate successfully",
    data: result,
  });
});

export const PaymentController = { initPayment, validatePayment };
