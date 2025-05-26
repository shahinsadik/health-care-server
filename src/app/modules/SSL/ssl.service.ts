import axios from "axios";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import status from "http-status";

const initPayment = async (paymentData: any) => {
  try {
    const data = {
      store_id: config.ssl.store_id,
      store_passwd: config.ssl.store_passwd,
      total_amount: paymentData?.amount,
      currency: "BDT",
      tran_id: paymentData.transactionId,
      success_url: config.ssl.success_url,
      fail_url: config.ssl.fail_url,
      cancel_url: config.ssl.cancel_url,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Appointment",
      product_category: "Service",
      product_profile: "general",
      cus_name: paymentData?.name,
      cus_email: paymentData?.email,
      cus_add1: paymentData?.address,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "Bangladesh",
      cus_phone: paymentData?.phone,
      cus_fax: "N/A",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: 1000,
      ship_country: "N/A",
    };
    

    const response = await axios({
      method: "POST",
      url: config.ssl.ssl_payment_url,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (err) {
    throw new ApiError(status.BAD_REQUEST, "Payment initialization failed");
  }
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.ssl.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.ssl.store_id}&store_passwd=${config.ssl.store_passwd}&format=json`,
    });
    return response.data;
  } catch (err) {
    throw new ApiError(status.BAD_REQUEST, "Payment validation failed");
  }
};
export const SSLService = { initPayment, validatePayment };
