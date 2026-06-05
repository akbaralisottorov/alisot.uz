import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class CategoryRepository {
  static async createCategory(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  }

  static async getCategories() {
    return prisma.category.findMany();
  }

  static async getCategoryWithArticles(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        articles: {
          include: { author: true }
        }
      }
    });
  }
}
