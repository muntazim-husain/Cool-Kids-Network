import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async create(email: string) {
    try {
      const randomData = await fetch('https://randomuser.me/api/')
        .then((res) => res.json())
        .then((data) => ({
          firstName: data.results[0].name.first,
          lastName: data.results[0].name.last,
          country: data.results[0].location.country,
        }));

      return await prisma.user.create({
        data: {
          email,
          character: {
            create: randomData,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async fetchAllUsers(role: string) {
    const includeEmailAndRole = role === 'Coolest Kid';

    return prisma.user.findMany({
      select: {
        character: {
          select: {
            firstName: true,
            lastName: true,
            country: true,
          },
        },
        ...(includeEmailAndRole && {
          email: true,
          role: true,
        }),
      },
    });
  }

  async updateRole(email: string, newRole: string) {
    const validRoles = ['Cool Kid', 'Cooler Kid', 'Coolest Kid'];
    
    if (!validRoles.includes(newRole)) {
      throw new BadRequestException('Invalid role');
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return prisma.user.update({
      where: { email },
      data: { role: newRole },
      include: { character: true }
    });
  }
}
