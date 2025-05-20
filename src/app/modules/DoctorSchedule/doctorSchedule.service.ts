import prisma from "../../../sheared/prisma";

const insertIntoDB = async (
  user: any,
  payload: { scheduleIds: string[] }
) => {
  const doctorData = await prisma.doctor.findUnique({
    where: {
      email: user.email,
    },
  });
  console.log("doctor schedule controller scheduleIds",payload.scheduleIds );
};
export const DoctorScheduleService = {
  insertIntoDB,
};
