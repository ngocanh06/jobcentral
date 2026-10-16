import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import { otpService } from './otpService.js';
import { sendOtpMail } from './mailer.js';
import { findUserByEmail } from './userRepo.js';

export const authRouter = Router();

const DUMMY_HASH = bcrypt.hashSync('khong-ton-tai', 10);
const sessions = new Map<string, { email: string; expiresAt: number }>();

// BƯỚC 1: kiểm tra email + mật khẩu, rồi gửi OTP
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const email = String(req.body?.email ?? '').trim().toLowerCase();
    const password = String(req.body?.password ?? '');
    const user = await findUserByEmail(email);
    const ok = await bcrypt.compare(password, user ? user.passwordHash : DUMMY_HASH);
    if (!user || !ok) return res.status(401).json({ success: false, message: 'Sai email hoặc mật khẩu' });

    const r = await otpService.sendOtp(email, sendOtpMail);
    if (!r.success) return res.status(429).json(r);

    const sessionId = crypto.randomBytes(32).toString('hex');
    sessions.set(sessionId, { email, expiresAt: Date.now() + 5 * 60 * 1000 });
    res.json({ success: true, sessionId, message: 'Đã gửi mã OTP về email của bạn' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Không gửi được email, thử lại sau' });
  }
});

// BƯỚC 2: xác minh OTP, cấp token
authRouter.post('/verify-otp', (req: Request, res: Response) => {
  const { sessionId, otp } = req.body ?? {};
  const s = typeof sessionId === 'string' ? sessions.get(sessionId) : undefined;
  if (!s || Date.now() > s.expiresAt) {
    return res.status(400).json({ success: false, message: 'Phiên đã hết hạn, hãy đăng nhập lại' });
  }

  const r = otpService.verifyOtp(s.email, String(otp ?? ''));
  if (!r.success) return res.status(400).json(r);

  sessions.delete(sessionId);
  const token = jwt.sign({ sub: s.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({ success: true, message: 'Đăng nhập thành công', token });
});

// GỬI LẠI: không cần nhập lại mật khẩu, vẫn bị cooldown 60 giây trong OtpService
authRouter.post('/resend-otp', async (req: Request, res: Response) => {
  const s = typeof req.body?.sessionId === 'string' ? sessions.get(req.body.sessionId) : undefined;
  if (!s || Date.now() > s.expiresAt) {
    return res.status(400).json({ success: false, message: 'Phiên đã hết hạn, hãy đăng nhập lại' });
  }
  const r = await otpService.sendOtp(s.email, sendOtpMail);
  res.status(r.success ? 200 : 429).json(r);
});