import axios from 'axios';
import paymentService from '../services/payment.service.js';
import ApiResponse from '../utils/Api.response.js';
import ApiError from '../utils/ApiError.js';

// 1 Create a new payment
export const createPayment = async (req, res) => {
  const { userId, studentId, studentFeeIds } = req.body;
  const token = req.headers['authorization']?.split(' ')[1];
  const newPayment = await paymentService.createPayment({ userId, studentId, studentFeeIds, token });
  res.status(201).json(new ApiResponse(201, "Payment created", newPayment));
};


// 2 Get payment by ID
export const getPayment = async (req, res) => {
  const { id } = req.params;
  const payment = await paymentService.getPaymentById(id);
  if (!payment) {
    throw new ApiError(404, "Not Found", "Payment with id " + id + " does not exist");
  }
  res.status(200).json(new ApiResponse(200, "Payment retrieved", payment));
};

// 3 List payments with optional filters
export const listPayments = async (req, res) => {
  const filters = req.query;
  const payments = await paymentService.listPayments(filters);
  res.status(200).json(new ApiResponse(200, "Payments fetched successfully", payments));
};

// 4 Update payment status
export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updatedPayment = await paymentService.updatePaymentStatus(id, status);
  res.status(200).json(new ApiResponse(200, "Payment status updated", updatedPayment));
};

// 5 Cancel a pending payment
export const cancelPayment = async (req, res) => {
  const { id } = req.params;
  const cancelledPayment = await paymentService.cancelPayment(id);
  res.status(200).json(new ApiResponse(200, "Payment cancelled", cancelledPayment));
};

