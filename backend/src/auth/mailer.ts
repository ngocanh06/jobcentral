import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpMail(to: string, otp: string): Promise<void> {
  await transporter.sendMail({
    from: `"JobCentral" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'Mã xác thực đăng nhập của bạn',
    text: `Mã OTP của bạn là ${otp}. Mã có hiệu lực trong 5 phút. Không chia sẻ mã này cho bất kỳ ai.`,
    html: `
      <div style="font-family:Arial,sans-serif">
        <p>Mã OTP của bạn là:</p>
        <h2 style="letter-spacing:6px">${otp}</h2>
        <p>Mã có hiệu lực trong <b>5 phút</b>. Không chia sẻ mã này cho bất kỳ ai.</p>
        <p style="color:#888">Nếu bạn không đăng nhập, hãy đổi mật khẩu ngay.</p>
      </div>`,
  });
}