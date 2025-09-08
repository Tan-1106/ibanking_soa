import Payment from "../models/payment.model.js";
import PaymentHistory from "../models/paymentHistory.model.js";

// 1 Get payment history by payment ID
export const getPaymentHistoryByPaymentId = async (paymentId) => {
  return await PaymentHistory.findAll({ where: { paymentId } });
};

// 2 Query payment histories with optional filters
export const queryPaymentHistories = async (filters = {}) => {
  return await PaymentHistory.findAll({ where: filters });
};

// 3 Append a new history entry to a payment
export const appendPaymentHistory = async (paymentId, { action, details }) => {
  const payment = await Payment.findByPk(paymentId);
  if (!payment) throw new Error('Payment not found');
    const newHistory = await PaymentHistory.create({
    paymentId,
    action,
    details
  });
  return newHistory;
}