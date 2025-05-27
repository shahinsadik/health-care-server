import { AppointmentStatus, PaymentStatus } from "../../../generated/prisma";
import prisma from "../../../sheared/prisma";
import { IAuthUser } from "../../interfaces/common";

const insertIntoDb = async (user: IAuthUser, payload: any) => {
  const appointmentData = await prisma.appointment.findUniqueOrThrow({
    where: {
      id: payload.appointmentId,
      status: AppointmentStatus.COMPLETED,
      paymentStatus: PaymentStatus.PAID,
    },
  });
  console.log("Data to insert:", appointmentData);
};
export const PrescriptionService = { insertIntoDb };
