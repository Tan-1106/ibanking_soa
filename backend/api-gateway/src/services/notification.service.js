import axios from "axios";

const NOTI_URL = "http://localhost:4006";

export const sendInvoice = (payload, token) =>
  axios.post(`${NOTI_URL}/notification/invoice`, payload, {
    headers: { Authorization: `Bearer ${token}` }
  }).then(r => r.data);