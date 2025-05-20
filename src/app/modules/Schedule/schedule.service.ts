import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../sheared/prisma";
import { Schedule } from "../../../generated/prisma";
import { ISchedule } from "../Specialties/schedule.interface";

const insertIntoDB = async (payload: ISchedule): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalTime = 30;
  const schedules = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );
    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(":")[1])
      )
    );

    while (startDateTime < endDateTime) {
      const scheduleData = {
        startDateTime: startDateTime,
        endDateTime: addMinutes(startDateTime, intervalTime),
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDateTime: scheduleData.startDateTime,
          endDateTime: scheduleData.endDateTime,
        },
      });

      if (!existingSchedule) {
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }
      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return schedules;
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

// console.log(fdf);

export const ScheduleService = {
  insertIntoDB,
};
