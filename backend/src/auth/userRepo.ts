import bcrypt from 'bcryptjs';

export interface AuthUser {
    id: number;
    email: string;
    passwordHash: string;
}

// Dữ liệu demo. Đổi email thành email THẬT của bạn để nhận được mail.
// Mật khẩu demo: 123456
const users: AuthUser[] = [
    {
        id: 1,
        email: 'vietnhiennguyen91@gmail.com',
        passwordHash: bcrypt.hashSync('123456', 10),
    },
];

export async function findUserByEmail(email: string): Promise<AuthUser | null> {
    return users.find((u) => u.email === email.trim().toLowerCase()) ?? null;
}