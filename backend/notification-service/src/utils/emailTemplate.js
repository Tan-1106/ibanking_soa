/**
 * invoiceEmailTemplate(payment, items)
 * payment: { paymentRef, payerUserId, studentId, totalAmount, status, createdAt, ... }
 * items: [{ id, studentFeeId, amount }, ...]
 */
export const invoiceEmailTemplate = (payment, items = []) => {
  const rows = items.map((it, idx) => `
    <tr>
      <td style="padding:8px 12px; border:1px solid #eee;">${idx + 1}</td>
      <td style="padding:8px 12px; border:1px solid #eee;">${it.studentFeeName || `Fee #${it.studentFeeId || ""}`}</td>
      <td style="padding:8px 12px; border:1px solid #eee; text-align:right;">${Number(it.amount).toLocaleString()}</td>
    </tr>
  `).join("");

  return `
  <div style="font-family: Arial, sans-serif; color:#222; max-width:700px;">
    <h2 style="color:#2d89ef;">Hóa đơn thanh toán</h2>
    <p>Ref: <strong>${payment.paymentRef}</strong></p>
    <p>MSV người nộp: <strong>${payment.studentId || "-"}</strong></p>
    <p>Trạng thái: <strong>${payment.status}</strong></p>
    <p>Ngày: ${new Date(payment.createdAt || Date.now()).toLocaleString()}</p>

    <table style="width:100%; border-collapse:collapse; margin-top:12px;">
      <thead>
        <tr>
          <th style="padding:8px 12px; border:1px solid #eee; text-align:left;">#</th>
          <th style="padding:8px 12px; border:1px solid #eee; text-align:left;">Mục</th>
          <th style="padding:8px 12px; border:1px solid #eee; text-align:right;">Số tiền</th>
        </tr>
      </thead>
      <tbody>
        ${rows || `<tr><td colspan="3" style="padding:12px; border:1px solid #eee; text-align:center;">Không có mục thanh toán</td></tr>`}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding:8px 12px; border:1px solid #eee; text-align:right; font-weight:700;">Tổng</td>
          <td style="padding:8px 12px; border:1px solid #eee; text-align:right; font-weight:700;">${Number(payment.totalAmount || 0).toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>

    <p style="margin-top:16px;">Cảm ơn bạn đã thanh toán.</p>
    <hr />
    <p style="font-size:13px; color:#777;">Nếu có thắc mắc vui lòng liên hệ bộ phận hỗ trợ.</p>
  </div>
  `;
};