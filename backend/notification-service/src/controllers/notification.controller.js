import ApiResponse from "../utils/Api.response.js";
import * as notificationService from "../services/notification.service.js";

export async function sendInvoice(req, res) {
  const { payment, items, to } = req.body;
  const result = await notificationService.sendInvoiceByPayment({ payment, items, to });
  res.status(200).json(new ApiResponse(200, "Invoice sent successfully", result));
}