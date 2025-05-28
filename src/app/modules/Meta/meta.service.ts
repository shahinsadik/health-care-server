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
  console.log({appointmentCount, patientCount, doctorCount, paymentCount,totalRevenue});
  
};
const getDoctorMetaData = async (user: IAuthUser) => {
    const doctorData = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user?.email,
        }
    })
    const appointmentCount = await prisma.appointment.count({
        where: {
            doctorId: doctorData.id,
        }
    })
    const patientCount = await prisma.appointment.groupBy({
        by: ['patientId'],
        
    });
    console.log("Fetching  meta data  Doctor", patientCount);
};
const getPatientMetaData = async () => {
  console.log("Fetching  meta data Patient");
};

export const MetaService = {
  fetchDashboardMeta,
};
