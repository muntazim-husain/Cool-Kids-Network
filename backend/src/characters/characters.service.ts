import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CharactersService {
  async getCharacterByUserId(userId: number) {
    return prisma.character.findUnique({ where: { userId } });
  }
}
