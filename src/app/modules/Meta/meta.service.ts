import status from "http-status";
import { UserRole } from "../../../generated/prisma";
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common";

const fetchDashboardMeta = (user: IAuthUser) => {
  switch (user?.role) {
    case UserRole.SUPER_ADMIN:
      getSuperAdminMetaData();
      break;
    case UserRole.ADMIN:
      getAdminMetaData();
      break;
    case UserRole.DOCTOR:
      getDoctorMetaData();
      break;
    case UserRole.PATIENT:
      getPatientMetaData();
      break;
    default:
      throw new ApiError(status.UNAUTHORIZED, "Unauthorized user role");
  }
};
const getSuperAdminMetaData = () => {
  console.log("Fetching  meta data super  Admin");
};
const getAdminMetaData = () => {
  console.log("Fetching admin meta data  Admin");
};
const getDoctorMetaData = () => {
  console.log("Fetching  meta data  Doctor");
};
const getPatientMetaData = () => {
  console.log("Fetching  meta data Patient");
};

export const MetaService = {
  fetchDashboardMeta,
};
