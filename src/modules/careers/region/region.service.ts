// src/modules/careers/region/region.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegionDto) {
    data.status = Boolean(data.status);
    const region = await this.prisma.region.create({ data });
    return this.formatResponse(region, '/api/region/');
  }

  async findAll() {
    const regions = await this.prisma.region.findMany({ include: { posts: true } });
    const result = regions.map(r => ({ ...r, postCount: r.posts.length }));
    return this.formatResponse(result, '/api/region/');
  }

  async findOne(id: number) {
    const region = await this.prisma.region.findUnique({ where: { id } });
    if (!region) throw new NotFoundException(`Region ${id} not found`);
    return this.formatResponse(region, `/api/region/${id}`);
  }

  async update(id: number, data: UpdateRegionDto) {
    if (data.status !== undefined) data.status = Boolean(data.status);
    const updated = await this.prisma.region.update({ where: { id }, data });
    return this.formatResponse(updated, `/api/region/${id}`);
  }

  async remove(id: number) {
    await this.prisma.region.delete({ where: { id } });
    return this.formatResponse(null, `/api/region/${id}`);
  }

  private formatResponse(data: any, path: string) {
    return {
      status: true,
      path,
      statusCode: 200,
      message: 'Success',
      data,
      timestamp: new Date().toISOString(),
    };
  }
}