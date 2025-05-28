import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { Prisma } from "../../generated/prisma";

const globalErrorHandeler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = status.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Unique constraint failed";
      error = err.meta;
    } else if (err.code === "P2025") {
      message = "Record not found";
      error = err.message;
    } else {
      message = "Database Error";
      error = err.message;
    }
  }
  res.status(statusCode).send({
    success,
    message,
    error,
  });
};
export default globalErrorHandeler;
