import { prisma } from '../lib/prisma.js';
import { Prisma } from '@prisma/client';

export class GardenRepository {
  static async createNote(data: Prisma.GardenNoteCreateInput) {
    return prisma.gardenNote.create({ data });
  }

  static async getNotes(params: { search?: string, tag?: string, status?: string }) {
    const where: Prisma.GardenNoteWhereInput = {};
    if (params.search) {
      where.OR = [
        { title: { contains: params.search } },
        { content: { contains: params.search } }
      ];
    }
    if (params.tag) {
      where.tags = { contains: params.tag };
    }
    if (params.status) {
      where.status = params.status;
    }
    
    return prisma.gardenNote.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        linkedNodes: { select: { slug: true, title: true, status: true } },
        backlinks: { select: { slug: true, title: true, status: true } }
      }
    });
  }

  static async getNoteBySlug(slug: string) {
    return prisma.gardenNote.findUnique({
      where: { slug },
      include: {
        linkedNodes: { select: { slug: true, title: true, status: true } },
        backlinks: { select: { slug: true, title: true, status: true } }
      }
    });
  }

  static async updateNote(id: string, data: Prisma.GardenNoteUpdateInput) {
    return prisma.gardenNote.update({
      where: { id },
      data,
    });
  }

  static async deleteNote(id: string) {
    return prisma.gardenNote.delete({
      where: { id },
    });
  }
}
