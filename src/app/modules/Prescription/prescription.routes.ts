import express from "express";
import { PrescriptionController } from "./prescription.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.post("/", auth(UserRole.DOCTOR),PrescriptionController.insertIntoDb);

export const prescriptionRoutes = router;
