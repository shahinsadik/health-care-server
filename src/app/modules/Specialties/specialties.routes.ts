import express, { NextFunction, Request, Response } from "express";
import { SpecialtiesController } from "./specialties.controller";
import { FileUploaders } from "../../../helpers/fileUploaders";
import { SpecialtiesValidation } from "./specialties.validation";

const router = express.Router();

router.post(
  "/",
  FileUploaders.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = SpecialtiesValidation.create.parse(JSON.parse(req.body.data));
    return SpecialtiesController.insertIntoDB(req, res, next);
  }
);

export const SpecialtiesRoutes = router;
