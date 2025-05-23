import prisma from "../../../sheared/prisma";
import { IAuthUser } from "../../interfaces/common";


const createAppointment = async (user:IAuthUser, payload: any) => {
    const patientData = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
    })
  console.log("patientData data:", patientData, payload);
  
  
};

export const AppointmentService = {createAppointment}