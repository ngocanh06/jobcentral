import 'dotenv/config';
import crypto from 'node:crypto';

export interface OtpRecord {
  hash: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
  channel: 'email' | 'phone';
}

export class OtpService {
  private store = new Map<string, OtpRecord>();
  private readonly expiryMs = 5 * 60 * 1000;
  private readonly cooldownMs = 60 * 1000;
  private readonly maxAttempts = 5;

  private normalize(id: string) {
    return id.trim().toLowerCase();
  }

  private generateOtp(): string {
    return String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  }

  private hash(id: string, code: string): string {
    const secret = process.env.OTP_SECRET;
    if (!secret) throw new Error('Thiếu OTP_SECRET trong .env');
    return crypto.createHmac('sha256', secret).update(`${id}:${code}`).digest('hex');
  }

  public async sendOtp(
    rawId: string,
    sendFn: (to: string, code: string) => Promise<void>,
    channel: 'email' | 'phone' = 'email'
  ): Promise<{ success: boolean; message: string; cooldownSeconds?: number }> {
    const id = this.normalize(rawId);
    if (!id) return { success: false, message: 'Thông tin không hợp lệ.' };

    const now = Date.now();
    const existing = this.store.get(id);
    if (existing && now - existing.lastSentAt < this.cooldownMs) {
      const s = Math.ceil((this.cooldownMs - (now - existing.lastSentAt)) / 1000);
      return { success: false, message: `Vui lòng chờ ${s} giây trước khi yêu cầu mã mới.`, cooldownSeconds: s };
    }

    const code = this.generateOtp();
    this.store.set(id, {
      hash: this.hash(id, code),
      expiresAt: now + this.expiryMs,
      attempts: 0,
      lastSentAt: now,
      channel,
    });

    try {
      await sendFn(rawId, code);
    } catch (err) {
      this.store.delete(id);
      throw err;
    }

    return { success: true, message: 'Đã gửi mã OTP.' };
  }

  public verifyOtp(rawId: string, code: string): { success: boolean; message: string } {
    const id = this.normalize(rawId);
    const record = this.store.get(id);
    if (!record) return { success: false, message: 'Mã OTP không tồn tại hoặc đã hết hạn.' };

    if (Date.now() > record.expiresAt) {
      this.store.delete(id);
      return { success: false, message: 'Mã OTP đã hết hiệu lực. Vui lòng yêu cầu mã mới.' };
    }
    if (record.attempts >= this.maxAttempts) {
      this.store.delete(id);
      return { success: false, message: 'Nhập sai quá số lần cho phép. Vui lòng yêu cầu mã mới.' };
    }

    const given = Buffer.from(this.hash(id, code.trim()), 'hex');
    const saved = Buffer.from(record.hash, 'hex');
    const ok = crypto.timingSafeEqual(given, saved);
    if (!ok) {
      record.attempts += 1;
      return { success: false, message: `Mã OTP không chính xác. Bạn còn ${this.maxAttempts - record.attempts} lần thử.` };
    }

    this.store.delete(id);
    return { success: true, message: 'Xác thực thành công.' };
  }
}

export const otpService = new OtpService();