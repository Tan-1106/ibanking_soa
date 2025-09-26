import Payment from '../models/payment.model.js';
import PaymentItem from '../models/paymentItem.model.js';
import ApiError from '../utils/ApiError.js';
import fetchApi from '../utils/fetchApi.js';
import { v4 } from 'uuid';
const STUDENT_SERVICE_URL = process.env.STUDENT_SERVICE_URL;
const EXPIRED_PAYMENT_TIMEOUT = 5 * 60 * 1000;
const paymentService = {
  createPayment: async ({ userId, studentId }) => {
    let apiEndpoint = `${STUDENT_SERVICE_URL}/students/fees/${studentId}`;
    let response = await fetchApi(apiEndpoint, { method: "GET" });
    const studentFees = response.data;
    const totalAmount = studentFees.reduce((sum, fee) => sum + parseFloat(fee.amount), 0);
    if (totalAmount <= 0)
      throw new ApiError(400, "Amount Error", "Total amount must be greater than zero");
    const studentFeeIds = studentFees.map(f => f.id);
    apiEndpoint = `${STUDENT_SERVICE_URL}/students/fees/processing`;
    await fetchApi(apiEndpoint, { method: "POST", body: { studentFeeIds } });
    const paymentRef = `PAY-${v4()}`;
    const payment = await Payment.create({ userId, paymentRef, totalAmount, expiresAt: new Date(Date.now() + EXPIRED_PAYMENT_TIMEOUT) });
    setInterval(async () => {
      const p = await Payment.findByPk(payment.id);
      if (p.status === "pending") {
        p.update({ status: "failed" });
      }
    }, EXPIRED_PAYMENT_TIMEOUT);
    studentFeeIds.forEach(studentFeeId => {
      PaymentItem.create({
        paymentId: payment.id,
        studentFeeId,
        amount: studentFees.find(f => f.id === studentFeeId).amount
      })
    })
    return payment;
  },

  getPaymentById: async (id) => {
    return await Payment.findByPk(id);
  },

  listPayments: async (filters = {}) => {
    return await Payment.findAll({ where: filters });
  },

  confirmPayment: async (paymentId) => {
    try {
      const payment = await Payment.findByPk(paymentId);
      if (!payment) {
        throw new ApiError(404, "Payment not found", " Payment with ID " + paymentId + " does not exist");
      }
      if (payment.status !== "pending") {
        throw new ApiError(400, "Invalid Payment Status", " Only pending payments can be confirmed");
      }

      const paymentItems = await PaymentItem.findAll({ where: { paymentId } });
      const studentFeeIds = paymentItems.map(item => item.studentFeeId);

      let apiEndpoint = `${STUDENT_SERVICE_URL}/students/fees/mark-paid`;
      let response = await fetchApi(apiEndpoint, { method: "POST", body: { paymentRef: payment.paymentRef, studentFeeIds } });
      if (response.data !== true) {
        throw new ApiError(500, "Failed to mark fees as paid", " Could not update student fees status");
      }
      payment.status = "completed";
      payment.paidAt = new Date();
      await Payment.update({ status: "completed", paidAt: new Date() }, { where: { id: paymentId } });
      return payment;
    } catch (error) {
      if (error instanceof ApiError) {
        throw new ApiError(error.status, error.title, error.message, error.stack);
      }
      throw new ApiError(500, "Internal Server Error", error.message, error.stack);
    }
  },
};
export default paymentService;