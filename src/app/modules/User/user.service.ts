import { UserRole } from "../../../generated/prisma";
import * as bcrypt from "bcrypt";
import prisma from "../../../sheared/prisma";
import { FileUploaders } from "../../../helpers/fileUploaders";

const createAdmin = async (req: any) => {
  const file = req.file;
  if (file) {
    const uploadToCloudaniry = await FileUploaders.uploadCloudaniry(file);
    req.body.data.admin.profilePhoto = uploadToCloudaniry?.secure_url
    console.log(req.body.data, "fewsrewrewr");
    
  }
  // const hashedPassword: string = await bcrypt.hash(data.password, 12);

  // const userData = {
  //   email: data.admin.email,
  //   password: hashedPassword,
  //   role: UserRole.ADMIN,
  // };

  // const result = await prisma.$transaction(async (transactionClient) => {
  //   await transactionClient.user.create({
  //     data: userData,
  //   });
  //   const createdAdminData = await transactionClient.admin.create({
  //     data: data.admin,
  //   });
  //   return createdAdminData;
  // });
  // return result;
};

export const UserService = { createAdmin };
