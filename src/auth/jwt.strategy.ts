import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // نأخذ التوكن من الـ Header في الطلب (Bearer Token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // نرفض التوكن إذا انتهت صلاحيته
      secretOrKey: process.env.JWT_SECRET || 'fallback_secret_key', // نفس المفتاح السري الذي استخدمناه سابقاً
    });
  }

  // إذا كان التوكن صحيحاً، ستعمل هذه الدالة وتُرجع بيانات المستخدم
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}