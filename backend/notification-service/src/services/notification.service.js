import Notification from "../models/notification.model.js";
import { sendEmail } from "./email.service.js";
import { invoiceEmailTemplate } from "../utils/emailTemplate.js";

// Send invoice email by provided payment + items
export const sendInvoiceByPayment = async (opts = {}) => {
  const { payment, items = [], to: overrideTo } = opts;

  if (!payment) throw new Error("Payment data is required");

  // 1) normalize items
  const itemsNormalized = (Array.isArray(items) ? items : []).map(it => ({
    ...it,
    amount: Number(it.amount || it.price || 0),
    studentFeeName: it.studentFeeName || it.description || (`Fee #${it.studentFeeId || it.id || ""}`)
  }));

  // 2) recipient email
  const toEmail = overrideTo || payment.payerEmail || payment.payer?.email;
  if (!toEmail) throw new Error("No recipient email available");

  // 3) subject + html
  const subject = `Hóa đơn thanh toán ${payment.paymentRef || (payment.id ? `#${payment.id}` : "")}`;
  const html = invoiceEmailTemplate(payment, itemsNormalized);

  // 4) send mail
  const emailRes = await sendEmail(toEmail, subject, html);

  // 5) save notification record
  const notification = await Notification.create({
    type: "email",
    to: toEmail,
    subject,
    message: html,
    status: emailRes.success ? "sent" : "failed",
    response: JSON.stringify(emailRes),
    metadata: JSON.stringify({ paymentId: payment.id || payment.paymentId, paymentRef: payment.paymentRef })
  });

  return { notification, emailRes, payment };
};