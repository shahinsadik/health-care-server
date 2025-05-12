import { z } from "zod";
import { Gender, UserStatus } from "../../../generated/prisma";

const createAdmin = z.object({
  password: z.string({
    required_error: "Password Required!",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is Required!",
    }),
    email: z.string({
      required_error: "Email is Required!",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is Required!",
    }),
  }),
});

export const createDoctor = z.object({
  password: z.string({
    required_error: "Password is required",
  }),

  doctor: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Name is required"),

    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    contactNumber: z.string({
      required_error: "Contact number is required",
    }),

    address: z.string().optional(),

    registrationNumber: z.string({
      required_error: "Registration number is required",
    }),

    experience: z.number().optional(),

    gender: z.enum([Gender.MALE, Gender.FEMALE]),

    appointmentFee: z.number({
      required_error: "Appointment fee is required",
    }),

    qualification: z.string({
      required_error: "Qualification is required",
    }),

    currentWorkingPlace: z.string({
      required_error: "Current working place is required",
    }),

    designation: z.string({
      required_error: "Designation is required",
    }),
  }),
});

const createPatient = z.object({
    password: z.string(),
    patient: z.object({
        email: z.string({
            required_error: "Email is required!"
        }).email(),
        name: z.string({
            required_error: "Name is required!"
        }),
        contactNumber: z.string({
            required_error: "Contact number is required!"
        }),
        address: z.string({
            required_error: "Address is required"
        })
    })
});

const updateStatus = z.object({
    body: z.object({
        status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
    })
})
export const UserValidation = {
  createAdmin,
  createDoctor,
  createPatient
};
