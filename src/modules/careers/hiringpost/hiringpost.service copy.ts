
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateHiringPostDto } from './dto/create-hiringpost.dto';
import { UpdateHiringPostDto } from './dto/update-hiringpost.dto';

@Injectable()
export class HiringPostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHiringPostDto) {
    const hiringPost = await this.prisma.hiringPost.create({ data });
    return hiringPost;
  }

  async findAll() {
    return await this.prisma.hiringPost.findMany({
      include: {
        category: true,
        jobType: true,
        location: true,
      },
    });
  }

  async findOne(id: number) {
    const hiringPost = await this.prisma.hiringPost.findUnique({
      where: { id },
      include: {
        category: true,
        jobType: true,
        location: true,
      },
    });
    if (!hiringPost) {
      throw new NotFoundException('Hiring post not found.');
    }
    return hiringPost;
  }

  async update(id: number, data: UpdateHiringPostDto) {
    const existingPost = await this.prisma.hiringPost.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException('Hiring post not found.');
    }
    return await this.prisma.hiringPost.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const existingPost = await this.prisma.hiringPost.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException('Hiring post not found.');
    }
    await this.prisma.hiringPost.delete({ where: { id } });
    return { message: 'Hiring post deleted successfully.' };
  }
}
