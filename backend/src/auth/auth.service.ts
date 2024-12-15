import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  async validateUser(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { character: true },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async login(user: any) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      character: user.character,
    };
  }
} 