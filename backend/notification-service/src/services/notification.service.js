import Notification from "../models/notification.model.js";
import { sendMail } from "./email.service.js";
import { invoiceEmailTemplate } from "../utils/notification_template.js";
const notificationService = {
  sendInvoice: async (email, paymentId, paidAt, amount) => {
    const formattedPaidAt = new Date(paidAt).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh"

    });
    paidAt = formattedPaidAt;
    amount = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
    const emailContent = invoiceEmailTemplate({
      email,
      paymentId,
      paidAt,
      amount
    });
    const subject = `Hóa đơn thanh toán #${paymentId}`;
    const notification = await Notification.create({
      email,
      subject,
      content: emailContent,
    });
    sendMail({ to: email, subject, html: emailContent })
      .then(() => {
        notification.status = "sent";
        notification.save();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        notification.status = "failed";
        notification.save();
      });
  }
}
export { notificationService };