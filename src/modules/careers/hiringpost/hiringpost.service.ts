import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHiringPostDto } from './dto/create-hiringpost.dto';
import { UpdateHiringPostDto } from './dto/update-hiringpost.dto';

@Injectable()
export class HiringPostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateHiringPostDto) {
    // Check if category exists
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!categoryExists) {
      throw new NotFoundException(`Category with ID ${data.categoryId} not found.`);
    }
    
    const hiringPost = await this.prisma.hiringPost.create({ data });
    return {
      status: true,
      path: '/api/hiringpost/',
      statusCode: 201,
      message: 'Hiring post created successfully',
      data: hiringPost,
      timestamp: new Date().toISOString(),
    };
  }
  

  async findAll() {
    const hiringPosts = await this.prisma.hiringPost.findMany({
      include: {
        category: true,
        jobType: true,
        location: true,
      },
    });
    return {
      status: true,
      path: '/api/hiringpost/',
      statusCode: 200,
      message: 'Request was successful',
      data: hiringPosts,
      timestamp: new Date().toISOString(),
    };
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
    return {
      status: true,
      path: `/api/hiringpost/${id}`,
      statusCode: 200,
      message: 'Request was successful',
      data: hiringPost,
      timestamp: new Date().toISOString(),
    };
  }

  async update(id: number, data: UpdateHiringPostDto) {
    const existingPost = await this.prisma.hiringPost.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException('Hiring post not found.');
    }
    const updatedPost = await this.prisma.hiringPost.update({
      where: { id },
      data,
    });
    return {
      status: true,
      path: `/api/hiringpost/${id}`,
      statusCode: 200,
      message: 'Hiring post updated successfully',
      data: updatedPost,
      timestamp: new Date().toISOString(),
    };
  }

  async remove(id: number) {
    const existingPost = await this.prisma.hiringPost.findUnique({ where: { id } });
    if (!existingPost) {
      throw new NotFoundException('Hiring post not found.');
    }
    await this.prisma.hiringPost.delete({ where: { id } });
    return {
      status: true,
      path: `/api/hiringpost/${id}`,
      statusCode: 200,
      message: 'Hiring post deleted successfully',
      timestamp: new Date().toISOString(),
    };
  }
}
