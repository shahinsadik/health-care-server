import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";

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

export const UserController = { createAdmin };
