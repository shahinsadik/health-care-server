import { NextFunction, Request, Response } from "express";
import status from "http-status";

const globalErrorHandeler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(status.INTERNAL_SERVER_ERROR).send({
    success: false,
    message: err.message || "Some thing went worng!",
    error: err || "Internal Server Error",
  });
};
export default globalErrorHandeler;