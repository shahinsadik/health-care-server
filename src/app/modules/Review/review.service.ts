import status from "http-status";
import prisma from "../../../sheared/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import { Prisma } from "../../../generated/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationsOptions } from "../../interfaces/pagination";

const insertIntoDB = async (user: IAuthUser, payload: any) => {
  const patientDta = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
    },
  });
  if (!(patientDta.id === appointmentData.patientId)) {
    throw new ApiError(status.BAD_GATEWAY, "Patient not found");
  }
  const result = await prisma.review.create({
    data: {
      patientId: appointmentData.patientId,
      doctorId: appointmentData.doctorId,
      appointmentId: payload.appointmentId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });
  return result;
};
const getAllFromDB = async (filters: any, options: IPaginationsOptions) => {
  const { limit, page, skip } = paginationHelper.calculatePagination(options);
  const { patientEmail, doctorEmail } = filters;
  const andConditions = [];

  if (patientEmail) {
    andConditions.push({
      patient: {
        email: patientEmail,
      },
    });
  }

  if (doctorEmail) {
    andConditions.push({
      doctor: {
        email: doctorEmail,
      },
    });
  }

  const whereConditions: Prisma.ReviewWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.review.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: "desc",
          },
    include: {
      doctor: true,
      patient: true,
      //appointment: true,
    },
  });
  const total = await prisma.review.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const ReviewService = { insertIntoDB, getAllFromDB };
