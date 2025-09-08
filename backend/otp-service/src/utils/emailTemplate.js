export const otpEmailTemplate = (code) => `
  <h2>Mã xác thực OTP của bạn</h2>
  <p>Mã OTP: <b>${code}</b></p>
  <p>Mã có hiệu lực trong 5 phút.</p>
`;
