import { notificationService } from "../services/notification.service.js";
import ApiResponse from "../utils/Api.response.js";

export async function sendInvoice(req, res) {
  const { email, paymentId, amount, paidAt } = req.body;
  await notificationService.sendInvoice(email, paymentId, paidAt, amount);
  res.status(200).json(new ApiResponse(200, "Invoice sent successfully", null));
}
