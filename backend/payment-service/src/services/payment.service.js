import Payment from '../models/payment.model.js';
import PaymentItem from "../models/paymentItem.model.js";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL;
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL;
const SERVICE_AUTH_TOKEN = process.env.SERVICE_AUTH_TOKEN;

// 1 Create a new payment
export const createPayment = async ({ userId, studentMssv, studentFeeIds }) => {
  // 1. Gọi sang Student Service để lấy danh sách studentFees
  let fees;
  try {
    const response = await axios.post(
      `${STUDENT_SERVICE_URL}/students/fees/batch`,
      { studentFeeIds },
      { headers: { "x-service-token": SERVICE_AUTH_TOKEN } }
    );
    fees = response.data;
  } catch (err) {
    throw new Error(`[PaymentService] Failed to fetch fees: ${err.message}`);
  }

  if (!fees || fees.length === 0) {
    throw new Error("No valid fees found for payment");
  }

  // 2. Tính tổng tiền
  const totalAmount = fees.reduce((sum, f) => sum + parseFloat(f.amount), 0);

  // 3. Tạo Payment
  const newPayment = await Payment.create({
    paymentRef: `PAY-${uuidv4()}`,
    payerUserId: userId,
    studentMssv,
    totalAmount,
    status: "pending",
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
};

// 2 Get payment by ID
export const getPaymentById = async (id) => {
  return await Payment.findByPk(id);
}

// 3 List payments with optional filters
export const listPayments = async (filters = {}) => {
  return await Payment.findAll({ where: filters });
}

// 4 Update payment status
export const updatePaymentStatus = async (id, status) => {
  const payment = await getPaymentById(id);
  if (!payment) throw new Error('Payment not found');
  payment.status = status;
  await payment.save();
  return payment;
}

// 5 Cancel a pending payment
export const cancelPayment = async (id) => {
  const payment = await getPaymentById(id);
  if (!payment) throw new Error('Payment not found');
  if (payment.status !== 'pending') throw new Error('Only pending payments can be cancelled');
  payment.status = 'cancelled';
  await payment.save();
  return payment;
}

// 6 Confirm payment (verify OTP, deduct balance, mark fee paid)
export const confirmPayment = async (id) => {
  const payment = await getPaymentById(id);
  if (!payment) throw new Error('Payment not found');
  if (payment.status !== 'pending') throw new Error('Only pending payments can be confirmed');

  // Update status
  payment.status = 'success';
  await payment.save();

  // Notify Notification service (fire-and-forget)
  if (NOTIFICATION_SERVICE_URL && SERVICE_AUTH_TOKEN) {
    try {
      await axios.post(
        `${NOTIFICATION_SERVICE_URL}/notifications/invoice`,
        {
          payment,  // gửi thẳng payment object
          items: [],
          to: payment.payerEmail || 'test@example.com'
        },
        {
          headers: { 'x-service-token': SERVICE_AUTH_TOKEN }
        }
      );
    } catch (err) {
      console.error('[Payment->Notification] Failed to send invoice:', err.message);
    }
  } else {
    console.warn('[Payment->Notification] Notification service not configured');
  }

  return payment;
}