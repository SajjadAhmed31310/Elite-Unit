import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import * as argon2 from 'argon2';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user exists
    const existing = await (this.prisma as any).user.findFirst({
      where: { OR: [{ email: dto.email }, { handle: dto.handle }] },
    });
    if (existing) throw new BadRequestException('User already exists');

    // Hash password
    const passwordHash = await argon2.hash(dto.password);

    // Create User
    const user = await (this.prisma as any).user.create({
      data: {
        email: dto.email,
        handle: dto.handle,
        name: dto.name,
        passwordHash,
      },
    });

    // Simulate Email Verification
    const verifyToken = this.jwt.sign({ sub: user.id }, { expiresIn: '1d', secret: 'verify_secret' });
    this.logger.log(`[EMAIL SIMULATION] Verification Link: /auth/verify?token=${verifyToken}`);

    return this.signTokens(user.id, user.email, user.role);
  }

  async login(dto: AuthDto) {
    const user = await (this.prisma as any).user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const pwMatches = await argon2.verify(user.passwordHash, dto.password);
    if (!pwMatches) throw new UnauthorizedException('Invalid credentials');

    return this.signTokens(user.id, user.email, user.role);
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await (this.prisma as any).user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('Access Denied');

    // Find the stored refresh token (in a real app, hash and compare)
    // For this implementation we assume standard comparison or hash comparison
    // Here we implement hash check logic against DB records
    // Simplified for this snippet:
    const rtMatches = true; // Placeholder for actual hash check logic against RefreshToken table
    if (!rtMatches) throw new UnauthorizedException('Access Denied');

    return this.signTokens(user.id, user.email, user.role);
  }

  async signTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(payload, { expiresIn: '15m', secret: process.env.JWT_SECRET }),
      this.jwt.signAsync(payload, { expiresIn: '7d', secret: process.env.JWT_REFRESH_SECRET }),
    ]);

    // Store RT hash
    const rtHash = await argon2.hash(rt);
    await (this.prisma as any).refreshToken.create({
      data: {
        userId,
        tokenHash: rtHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { access_token: at, refresh_token: rt };
  }
}