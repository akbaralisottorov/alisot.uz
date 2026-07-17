import { prisma } from '../shared/lib/prisma.js';
import { Prisma } from '@prisma/client';

export class LearningRepository {
  static async createLearningNode(data: Prisma.LearningNodeCreateInput) {
    return prisma.learningNode.create({ data });
  }

  static async getLearningNodes() {
    return prisma.learningNode.findMany({
      orderBy: { updatedAt: 'desc' }
    });
  }

  static async getLearningNodesByCategory(category: string) {
    return prisma.learningNode.findMany({
      where: { category },
      orderBy: { updatedAt: 'desc' }
    });
  }

  static async updateLearningNode(id: string, data: Prisma.LearningNodeUpdateInput) {
    return prisma.learningNode.update({
      where: { id },
      data
    });
  }

  static async deleteLearningNode(id: string) {
    return prisma.learningNode.delete({
      where: { id }
    });
  }
}
