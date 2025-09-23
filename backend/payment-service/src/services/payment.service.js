import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import Payment from '../models/payment.model.js';
import PaymentItem from "../models/paymentItem.model.js";
import ApiError from '../utils/ApiError.js';
import fetchApi from '../utils/fetchApi.js';
const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL;
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL;
const SERVICE_AUTH_TOKEN = process.env.SERVICE_AUTH_TOKEN;
const paymentService = {

  createPayment: async ({ userId, studentId, studentFeeIds, token }) => {
    // 1. Gọi sang Student Service để lấy danh sách studentFees
    const url = `${STUDENT_SERVICE_URL}/students/fees/batch`;
    const apiResponse = await fetchApi(url, {
      method: "post",
      body: { studentFeeIds },
      headers: { "Authorization": `Bearer ${token}` }
    });
    const fees = apiResponse.data; //get fees from api

    if (!fees || fees.length === 0) {
      throw new ApiError(404, "Fees Not Found", "No valid student fees found for the provided IDs");
    }
    // 2. Tính tổng tiền thực tế từ DB
    const actualTotal = fees.reduce((sum, f) => sum + parseFloat(f.amount), 0);

    // 3. Tạo Payment
    const newPayment = await Payment.create({
      paymentRef: `PAY-${uuidv4()}`,
      userId: userId,
      totalAmount: actualTotal,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000) // hết hạn sau 15 phút
    });

    // 4. Tạo các PaymentItem
    for (const fee of fees) {
      await PaymentItem.create({
        paymentId: newPayment.id,
        studentFeeId: fee.id,
        amount: fee.amount
      });
    }

    return newPayment;
  },

  // 2 Get payment by ID
  getPaymentById: async (id) => {
    return await Payment.findByPk(id);
  },

  // 3 List payments with optional filters
  listPayments: async (filters = {}) => {
    return await Payment.findAll({ where: filters });
  },

  //!
  // 4 Update payment status
  updatePaymentStatus: async (id, status) => {
    const payment = await getPaymentById(id);
    if (!payment) throw new Error('Payment not found');
    payment.status = status;
    await payment.save();
    return payment;
  },

  //!
  // 5 Cancel a pending payment
  cancelPayment: async (id) => {
    const payment = await getPaymentById(id);
    if (!payment) throw new Error('Payment not found');
    if (payment.status !== 'pending') throw new Error('Only pending payments can be cancelled');
    payment.status = 'cancelled';
    await payment.save();
    return payment;
  },


  //!
  // 6 Confirm payment, gọi hàm này sau khi user nhập OTP đúng nhe bro
  confirmPayment: async (id, actorId) => {
    const payment = await Payment.findByPk(id, { include: PaymentItem });
    if (!payment) throw new Error("Payment not found");
    if (payment.status !== "pending") throw new Error("Only pending payments can be confirmed");

    const feeIds = payment.PaymentItems.map(item => item.studentFeeId);

    // 1. Deduct balance from User Service
    try {
      await axios.post(
        `${USER_SERVICE_URL}/users/${actorId}/deduct-balance`,
        { amount: payment.totalAmount },
        { headers: { "x-service-token": SERVICE_AUTH_TOKEN } }
      );
    } catch (err) {
      throw new ApiError(400, "Payment failed", `[PaymentService] Failed to deduct user balance: ${err.message}`);
    }

    // 2. Mark fees as paid in Student Service
    try {
      await axios.post(
        `${STUDENT_SERVICE_URL}/students/fees/mark-paid`,
        { studentFeeIds: feeIds },
        { headers: { "x-service-token": SERVICE_AUTH_TOKEN } }
      );
    } catch (err) {
      // Nếu fail thì rollback (refund), là không đổi status bên fee được thì phải hoàn tiền lại cho user
      await axios.post(`${USER_SERVICE_URL}/users/${actorId}/refund`, {
        amount: payment.totalAmount
      }, { headers: { "x-service-token": SERVICE_AUTH_TOKEN } });

      throw new Error(`[PaymentService] Failed to mark student fees: ${err.message}`);
    }

    // 3. Update payment status
    await updatePaymentStatus(payment.id, "success");

    return payment;
  }

};
export default paymentService;