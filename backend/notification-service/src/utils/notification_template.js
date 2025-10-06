export const invoiceEmailTemplate = ({ email, paymentId, paidAt, amount }) => {
  return `
   <!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hóa đơn thanh toán</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header {
      background: #4a90e2;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
    }
    .content {
      padding: 25px;
    }
    .content h2 {
      color: #333;
      font-size: 18px;
      margin-top: 0;
    }
    .invoice-info {
      margin: 15px 0;
      font-size: 14px;
      color: #555;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    table th, table td {
      padding: 10px;
      border-bottom: 1px solid #eee;
      text-align: left;
    }
    table th {
      background-color: #f0f4f8;
      font-weight: 600;
    }
    .total {
      text-align: right;
      font-size: 16px;
      font-weight: 600;
      color: #333;
      margin-top: 10px;
    }
    .footer {
      background: #f4f7fa;
      text-align: center;
      padding: 15px;
      font-size: 13px;
      color: #888;
    }
    .btn {
      display: inline-block;
      margin-top: 20px;
      background-color: #4a90e2;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
    }
    .btn:hover {
      background-color: #3a7bd5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hóa đơn thanh toán #${paymentId}</h1>
    </div>
    <div class="content">
      <h2>Xin chào ${email},</h2>
      <p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Dưới đây là chi tiết hóa đơn thanh toán của bạn:</p>

      <div class="invoice-info">
        <p><strong>Ngày tạo:</strong> ${paidAt}</p>
        <p><strong>Mã hóa đơn:</strong> ${paymentId}</p>
        <p><strong>Dịch vụ:</strong> Thanh toán học phí</p>
        <p><strong>Tổng cộng: ${amount} ₫</strong></p>
      </div>
    </div>


      <p style="margin-top: 25px;">Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email <a href="#">support@example.com</a>.</p>
    </div>
    <div class="footer">
      © 2025 YourCompany. Tất cả các quyền được bảo lưu.<br>
      Địa chỉ: 123 Đường ABC, TP. Hồ Chí Minh
    </div>
  </div>
</body>
</html>

    `};