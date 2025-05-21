import express, { NextFunction, Request, Response } from "express";
import { ScheduleController } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ScheduleController.insertIntoDB
);
router.get(
  "/",
  auth(UserRole.DOCTOR),
  ScheduleController.getAllFromDB
);

export const ScheduleRoutes = router;
