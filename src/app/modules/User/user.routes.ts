import express, { NextFunction, Request, Response } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
import { FileUploaders } from "../../../helpers/fileUploaders";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-admin",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  FileUploaders.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    return UserController.createAdmin(req, res, next);
  }
);
router.post(
  "/create-doctor",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  FileUploaders.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createDoctor.parse(JSON.parse(req.body.data));
    return UserController.createDoctor(req, res, next);
  }
);
router.post(
  "/create-patient",
  FileUploaders.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.createPatient.parse(JSON.parse(req.body.data));
    return UserController.createPatient(req, res, next);
  }
);

export const UserRoutes = router;
