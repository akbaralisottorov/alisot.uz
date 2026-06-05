import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class TagRepository {
  static async createTag(data: Prisma.TagCreateInput) {
    return prisma.tag.create({ data });
  }

  static async getTags() {
    return prisma.tag.findMany();
  }

  static async getTagWithArticles(id: string) {
    return prisma.tag.findUnique({
      where: { id },
      include: {
        articles: {
          include: { author: true }
        }
      }
    });
  }
}
