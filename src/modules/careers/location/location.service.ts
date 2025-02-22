import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Request } from 'express';

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  private formatResponse(req: Request, statusCode: number, message: string, data: any) {
    return {
      status: statusCode < 400,
      path: req.url,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  async create(req: Request, data: CreateLocationDto) {
    const existinglocation = await this.prisma.location.findUnique({
      where: { name: data.name },
    });

    if (existinglocation) {
      throw new ConflictException('location name already exists.');
    }

    const location = await this.prisma.location.create({
      data: {
        name: data.name,
        status: data.status,
      },
    });

    return this.formatResponse(req, 201, 'location created successfully', location);
  }

  async getAlllocation(req: Request) {
    const location = await this.prisma.location.findMany();
    return this.formatResponse(req, 200, 'location fetched successfully', location);
  }

  async getlocationById(req: Request, id: number) {
    const location = await this.prisma.location.findUnique({ where: { id } });

    if (!location) {
      throw new NotFoundException('location not found.');
    }

    return this.formatResponse(req, 200, 'location fetched successfully', location);
  }

  async updatelocation(req: Request, id: number, data: CreateLocationDto) {
    const existinglocation = await this.prisma.location.findUnique({ where: { id } });

    if (!existinglocation) {
      throw new NotFoundException('location not found.');
    }

    const updatedlocation = await this.prisma.location.update({
      where: { id },
      data: {
        name: data.name,
        status: data.status,
      },
    });

    return this.formatResponse(req, 200, 'location updated successfully', updatedlocation);
  }

  async deletelocation(req: Request, id: number) {
    const existinglocation = await this.prisma.location.findUnique({ where: { id } });

    if (!existinglocation) {
      throw new NotFoundException('location not found.');
    }

    await this.prisma.location.delete({ where: { id } });

    return this.formatResponse(req, 200, 'location deleted successfully', null);
  }
}
