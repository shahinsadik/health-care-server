import axios from "axios";
import config from "../../../config";
import prisma from "../../../sheared/prisma";
import { SSLService } from "../SSL/ssl.service";

const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findFirstOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: {
          patient: true,
        },
      },
    },
  });
  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    phone: paymentData.appointment.patient.contactNumber,
  };
  const result = await SSLService.initPayment(initPaymentData);
  return {
    paymentUrl: result.GatewayPageURL,
  };
};
const validatePayment = async (payload: any) => {
  if (!payload || !payload.status || !(payload.status === "VALID")) {
    return { message: "Invalid Payment" };
  }
  const response = await axios({
    method: "GET",
    url: `${config.ssl.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_passwd}&format=json`,
  });
};

export const PaymentService = { initPayment, validatePayment };
