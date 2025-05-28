import status from "http-status";
import { UserRole } from "../../../generated/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";
import prisma from "../../../sheared/prisma";

const fetchDashboardMeta = (user: IAuthUser) => {
  switch (user?.role) {
    case UserRole.SUPER_ADMIN:
      getSuperAdminMetaData();
      break;
    case UserRole.ADMIN:
      getAdminMetaData();
      break;
    case UserRole.DOCTOR:
      getDoctorMetaData(user as IAuthUser);
      break;
    case UserRole.PATIENT:
      getPatientMetaData();
      break;
    default:
      throw new ApiError(status.UNAUTHORIZED, "Unauthorized user role");
  }
};
const getSuperAdminMetaData = async () => {
  console.log("Fetching  meta data super  Admin");
};
const getAdminMetaData = async () => {
  const appointmentCount = await prisma.appointment.count();
  const patientCount = await prisma.patient.count();
  const doctorCount = await prisma.doctor.count();
  const paymentCount = await prisma.payment.count();
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
  });
  console.log({
    appointmentCount,
    patientCount,
    doctorCount,
    paymentCount,
    totalRevenue,
  });
};
const getDoctorMetaData = async (user: IAuthUser) => {
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  const appointmentCount = await prisma.appointment.count({
    where: {
      doctorId: doctorData.id,
    },
  });
  const patientCount = await prisma.appointment.groupBy({
    by: ["patientId"],
    _count: {
      id: true,
    },
  });
  const reviewCount = await prisma.review.count({
    where: {
      doctorId: doctorData.id,
    },
  });
  const totalRevenue = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      appointment: {
        doctorId: doctorData.id,
      },
    },
  });
  const appointmentStatusDistribution = await prisma.appointment.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
    where: {
      doctorId: doctorData.id,
    },
  })
  const formattedAppointmentStatusDistribution = appointmentStatusDistribution.map((item) => ({
    status: item.status,
    count: Number(item._count.id),
  }))
  console.dir(formattedAppointmentStatusDistribution, { depth: "infinity" });
};
const getPatientMetaData = async () => {
  console.log("Fetching  meta data Patient");
};

export const MetaService = {
  fetchDashboardMeta,
};
