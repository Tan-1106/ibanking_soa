import * as paymentService from '../services/payment.service.js';

// 1 Create a new payment
export const createPayment = async (req, res) => {
  try {
    const { userId, amount, method, status } = req.body;
    const newPayment = await paymentService.createPayment({ userId, amount, method, status });
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// 2 Get payment by ID
export const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await paymentService.getPaymentById(id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3 List payments with optional filters
export const listPayments = async (req, res) => {
  try {
    const filters = req.query;
    const payments = await paymentService.listPayments(filters);
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4 Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedPayment = await paymentService.updatePaymentStatus(id, status);
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 5 Cancel a pending payment
export const cancelPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const cancelledPayment = await paymentService.cancelPayment(id);
    res.json(cancelledPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 6 Confirm payment (verify OTP, deduct balance, mark fee paid) - Placeholder
export const confirmPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const confirmedPayment = await paymentService.confirmPayment(id);
    res.json(confirmedPayment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};