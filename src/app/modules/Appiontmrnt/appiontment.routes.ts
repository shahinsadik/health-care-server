import express from "express";
import { AppointmentController } from "./appiontment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";
const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  AppointmentController.getAllFromDB
);
router.get(
  "/my-appointment",
  auth(UserRole.PATIENT),
  AppointmentController.getMyAppointment
);

router.post(
  "/",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  AppointmentController.createAppointment
);
router.patch(
  "/status/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.changeAppointmentStatus
);

export const appointmentRoutes = router;
