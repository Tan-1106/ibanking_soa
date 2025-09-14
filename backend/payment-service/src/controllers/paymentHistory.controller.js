import * as paymentHistoryService from '../services/paymentHistory.service.js';
import ApiResponse from '../utils/Api.response.js';

// 1 Get payment history by payment ID
export const getPaymentHistory = async (req, res) => {
  const { paymentId } = req.params;
  const history = await paymentHistoryService.getPaymentHistoryByPaymentId(paymentId);
  res.status(200).json(new ApiResponse(200, "Payment history retrieved", history));
};

// 2 Query payment histories with optional filters
export const queryPaymentHistories = async (req, res) => {
  const filters = req.query;
  const histories = await paymentHistoryService.queryPaymentHistories(filters);
  res.status(200).json(new ApiResponse(200, "Payment histories fetched successfully", histories));
};

// 3 Append a new history entry to a payment
export const appendPaymentHistory = async (req, res) => {
  const { paymentId } = req.params;
  const { action, details } = req.body;
  const newHistory = await paymentHistoryService.appendPaymentHistory(paymentId, { action, details });
  res.status(201).json(new ApiResponse(201, "Payment history entry added", newHistory));
};