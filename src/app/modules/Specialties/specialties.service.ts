import { Request } from "express";
import { FileUploaders } from "../../../helpers/fileUploaders";
import prisma from "../../../sheared/prisma";

const insertIntoDB = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadToCloudinary = await FileUploaders.uploadCloudaniry(file);
    req.body.icon = uploadToCloudinary?.secure_url;
  }
  const result = await prisma.specialties.create({
    data: req.body,
  });
  return result;
};
export const SpecialtiesService = {
  insertIntoDB,
};
