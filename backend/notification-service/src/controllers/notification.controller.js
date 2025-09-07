import * as notificationService from "../services/notification.service.js";

export async function sendInvoice(req, res) {
  try {
    const { payment, items, to } = req.body;
    const result = await notificationService.sendInvoiceByPayment({ payment, items, to });
    res.status(200).json({ ok: true, result });
  } catch (err) {
    console.error("sendInvoice controller error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
}