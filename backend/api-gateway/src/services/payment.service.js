import axios from "axios";

const PAYMENT_URL = "http://localhost:4005";

export const createPayment = (data, token) =>
  axios.post(`${PAYMENT_URL}/payments`, data, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

export const confirmPayment = (paymentId, token) =>
  axios.post(`${PAYMENT_URL}/payments/${paymentId}/confirm`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);

export const saveHistory = (history, token) =>
  axios.post(`${PAYMENT_URL}/paymentHistory`, history, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);