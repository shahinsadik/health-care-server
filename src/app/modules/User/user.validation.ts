import { z } from "zod";

const createAdmin = z.object({
  password: z.string({
    required_error: "Password Requied!",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is Requied!",
    }),
    email: z.string({
      required_error: "Email is Requied!",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is Requied!",
    }),
  }),
});
export const UserValidation = {
  createAdmin,
};
