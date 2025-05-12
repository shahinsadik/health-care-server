import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { FileUploaders } from "../../../helpers/fileUploaders";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  FileUploaders.upload.single("file"),
  UserController.createAdmin
);

export const UserRoutes = router;
