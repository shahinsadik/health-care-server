import status from "http-status";
import {
  AppointmentStatus,
  PaymentStatus,
  Prescription,
} from "../../../generated/prisma";
import prisma from "../../../sheared/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { IPaginationsOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";

const insertIntoDb = async (
  user: IAuthUser,
  payload: Partial<Prescription>
) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      status: AppointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      doctor: true,
    },
  });

  if (!(user?.email === appointmentData.doctor.email)) {
    throw new ApiError(status.BAD_REQUEST, "This is not your appointment");
  }
  const result = await prisma.prescription.create({
    data: {
      appointmentId: payload.appointmentId as string,
      doctorId: appointmentData.doctor.id,
      patientId: appointmentData.patientId,
      instructions: payload.instructions as string,
      followUpDate: payload.followUpDate || null || undefined,
    },
    include: {
      patient: true,
    },
  });
  return result;
};

const patientPrescription = async (
  user: IAuthUser,
  options: IPaginationsOptions
) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.prescription.findMany({
    where: {
      patient: { email: user?.email },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { createdAt: "desc" },
    include: {
      doctor: true,
      patient: true,
      appointment: true
    },
  });
  const total = await prisma.prescription.count({
    where: {
      patient: { email: user?.email },
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
};
export const PrescriptionService = { insertIntoDb, patientPrescription };
