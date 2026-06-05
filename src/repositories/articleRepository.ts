import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';

export class ArticleRepository {
  static async createArticle(data: Prisma.ArticleCreateInput) {
    return prisma.article.create({ data });
  }

  static async getArticleById(id: string) {
    return prisma.article.findUnique({
      where: { id },
      include: { 
        author: true,
        categories: true,
        tags: true,
      },
    });
  }

  static async getArticleBySlug(slug: string) {
    return prisma.article.findUnique({
      where: { slug },
      include: { 
        author: true,
        categories: true,
        tags: true,
      },
    });
  }

  static async getPublishedArticles() {
    return prisma.article.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        author: true,
        categories: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getAllArticles() {
    return prisma.article.findMany({
      include: {
        author: true,
        categories: true,
        tags: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateArticle(id: string, data: Prisma.ArticleUpdateInput) {
    return prisma.article.update({
      where: { id },
      data,
    });
  }

  static async deleteArticle(id: string) {
    return prisma.article.delete({
      where: { id },
    });
  }
}
