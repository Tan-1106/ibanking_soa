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
    console.log(totalAmount);
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


};
export default paymentService;