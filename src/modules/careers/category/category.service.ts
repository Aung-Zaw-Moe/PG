import { Injectable, Body, UploadedFile, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() data: CreateCategoryDto, @UploadedFile() file: Express.Multer.File) {
    if (file) {
      data.image = (file as any).location; // Get the URL from S3
    }

    data.status = Boolean(data.status);
    data.image = data.image || null;

    const create = await this.prisma.category.create({
      data: { ...data },
    });

    return {
      status: true,
      path: `/api/category/`,
      statusCode: 200,
      message: 'Request was successful',
      data: create,
      timestamp: new Date().toISOString(),
    };
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        posts: true,
      },
    });

    const result = categories.map((category) => ({
      id: category.id,
      name: category.name,
      image: category.image,
      status: category.status,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      postCount: category.posts.length,
    }));

    return {
      status: true,
      path: `/api/category/`,
      statusCode: 200,
      message: 'Request was successful',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return {
      status: true,
      path: `/api/category/${id}`,
      statusCode: 200,
      message: 'Request was successful',
      data: category,
      timestamp: new Date().toISOString(),
    };
  }

  async update(id: number, data: UpdateCategoryDto, file?: Express.Multer.File) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (data.status !== undefined) {
      data.status = Boolean(data.status);
    }

    if (file) {
      data.image = (file as any).location;
    } else {
      delete data.image;
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        ...data,
      },
    });

    return {
      status: true,
      path: `/api/category/${id}`,
      statusCode: 200,
      message: 'Category updated successfully',
      data: updatedCategory,
      timestamp: new Date().toISOString(),
    };
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    await this.prisma.category.delete({ where: { id } });

    return {
      status: true,
      path: `/api/category/${id}`,
      statusCode: 200,
      message: 'Category deleted successfully',
      data: null,
      timestamp: new Date().toISOString(),
    };
  }
}
