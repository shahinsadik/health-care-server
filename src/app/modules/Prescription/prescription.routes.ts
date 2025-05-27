import express from "express";
import { PrescriptionController } from "./prescription.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/prisma";

const router = express.Router();

router.post("/", auth(UserRole.DOCTOR), PrescriptionController.insertIntoDb);
router.get("/my-prescriptions", auth(UserRole.PATIENT),PrescriptionController.patientPrescription);

export const prescriptionRoutes = router;
