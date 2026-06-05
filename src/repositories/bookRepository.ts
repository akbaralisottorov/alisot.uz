import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export class BookRepository {
  static async createBook(data: Prisma.BookCreateInput) {
    return prisma.book.create({ data });
  }

  static async getBooks(params: { search?: string, status?: string, category?: string }) {
    const where: Prisma.BookWhereInput = {};
    if (params.search) {
      where.OR = [
        { title: { contains: params.search, mode: 'insensitive' } },
        { author: { contains: params.search, mode: 'insensitive' } }
      ];
    }
    if (params.status) {
      where.status = params.status;
    }
    if (params.category) {
      where.category = {
        name: params.category
      };
    }
    
    return prisma.book.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getBookBySlug(slug: string) {
    return prisma.book.findUnique({
      where: { slug },
      include: {
        category: true,
      }
    });
  }

  static async updateBook(id: string, data: Prisma.BookUpdateInput) {
    return prisma.book.update({
      where: { id },
      data,
    });
  }

  static async deleteBook(id: string) {
    return prisma.book.delete({
      where: { id },
    });
  }
}

export class BookCategoryRepository {
  static async getCategories() {
    return prisma.bookCategory.findMany();
  }
  
  static async createCategory(data: Prisma.BookCategoryCreateInput) {
    return prisma.bookCategory.create({ data });
  }
}
