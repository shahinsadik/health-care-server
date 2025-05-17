import { addHours, format } from "date-fns";

const insertIntoDB = async (payload: any) => {
  const { startDate, endDate, startTime, endTime } = payload;
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addHours(
        `${format(currentDate, "yyyy-MM-dd")}`,
        Number(startTime.split(":")[0])
      )
    );
    const endDateTime = new Date(
      addHours(
        `${format(lastDate, "yyyy-MM-dd")}`,
        Number(endTime.split(":")[0])
      )
    );

    while (startDateTime <= endDateTime) {
      
    }
    console.log(endDateTime);
  }
};

// const getAllFromDB = async () => {
//   return await prisma.specialties.findMany();
// };

// const deleteFromDB = async (id: string): Promise<Specialties> => {
//   const result = await prisma.specialties.delete({
//     where: {
//       id,
//     },
//   });
//   return result;
// };
export const ScheduleService = {
  insertIntoDB,
};
