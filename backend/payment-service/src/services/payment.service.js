import Payment from '../models/payment.model.js';

// 1 Create a new payment
export const createPayment = async ({ userId, amount, method, status }) => {
  const newPayment = await Payment.create({
    userId,
    amount,
    method,
    status
  });
  return newPayment;
}

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

// 6 Confirm payment (verify OTP, deduct balance, mark fee paid) - Placeholder
export const confirmPayment = async (id) => {
  // Placeholder for OTP verification and transaction logic
    const payment = await getPaymentById(id);
    if (!payment) throw new Error('Payment not found');
    if (payment.status !== 'pending') throw new Error('Only pending payments can be confirmed');
    payment.status = 'success';
    await payment.save();
    return payment;
}