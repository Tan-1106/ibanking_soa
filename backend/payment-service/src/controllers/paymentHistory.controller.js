import * as paymentHistoryService from '../services/paymentHistory.service.js';

// 1 Get payment history by payment ID
export const getPaymentHistory = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const history = await paymentHistoryService.getPaymentHistoryByPaymentId(paymentId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2 Query payment histories with optional filters
export const queryPaymentHistories = async (req, res) => {
  try {
    const filters = req.query;
    const histories = await paymentHistoryService.queryPaymentHistories(filters);
    res.json(histories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3 Append a new history entry to a payment
export const appendPaymentHistory = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { action, details } = req.body;
    const newHistory = await paymentHistoryService.appendPaymentHistory(paymentId, { action, details });
    res.status(201).json(newHistory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};