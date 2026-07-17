import { prisma } from '../shared/lib/prisma.js';
import { Prisma } from '@prisma/client';

export class IdeaRepository {
  static async createIdea(data: Prisma.IdeaCreateInput) {
    return prisma.idea.create({ data });
  }

  static async getIdeas() {
    return prisma.idea.findMany({
      orderBy: { updatedAt: 'desc' }
    });
  }

  static async getIdeaBySlug(slug: string) {
    return prisma.idea.findUnique({
      where: { slug }
    });
  }

  static async updateIdea(id: string, data: Prisma.IdeaUpdateInput) {
    return prisma.idea.update({
      where: { id },
      data
    });
  }

  static async deleteIdea(id: string) {
    return prisma.idea.delete({
      where: { id }
    });
  }
}
