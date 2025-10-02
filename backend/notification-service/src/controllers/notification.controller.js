import * as notificationService from "../services/notification.service.js";
import ApiResponse from "../utils/Api.response.js";

export async function sendInvoice(req, res, next) { // giờ không cần.
  try {
    const { payment, items, to } = req.body;
    const result = await notificationService.sendInvoiceByPayment({ payment, items, to });
    res.status(200).json(new ApiResponse(200, "Invoice sent successfully", result));
  } catch (err) {
    next(err);
  }
}

export const handlePaymentConfirmed = async (req, res, next) => {
  try {
    const { payment, userId } = req.body;

    const to = payment.payerEmail || "test@example.com";

    const result = await notificationService.sendInvoiceByPayment({
      payment,
      items: payment.PaymentItems,
      to,
    });

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};