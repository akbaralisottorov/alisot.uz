import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export class UserRepository {
  static async createUser(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: { articles: true },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async getAllUsers() {
    return prisma.user.findMany();
  }
}
