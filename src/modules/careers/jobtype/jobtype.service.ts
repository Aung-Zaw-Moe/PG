import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateJobTypeDto } from './dto/create-jobtype.dto';
import { Request } from 'express';

@Injectable()
export class JobTypeService {
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

  async create(req: Request, data: CreateJobTypeDto) {
    const existingJobType = await this.prisma.jobType.findUnique({
      where: { name: data.name },
    });

    if (existingJobType) {
      throw new ConflictException('JobType name already exists.');
    }

    const jobType = await this.prisma.jobType.create({
      data: {
        name: data.name,
        status: data.status,
      },
    });

    return this.formatResponse(req, 201, 'JobType created successfully', jobType);
  }

  async getAllJobType(req: Request) {
    const jobType = await this.prisma.jobType.findMany();
    return this.formatResponse(req, 200, 'jobType fetched successfully', jobType);
  }

  async getJobTypeById(req: Request, id: number) {
    const JobType = await this.prisma.jobType.findUnique({ where: { id } });

    if (!JobType) {
      throw new NotFoundException('JobType not found.');
    }

    return this.formatResponse(req, 200, 'JobType fetched successfully', JobType);
  }

  async updateJobType(req: Request, id: number, data: CreateJobTypeDto) {
    const existingJobType = await this.prisma.jobType.findUnique({ where: { id } });

    if (!existingJobType) {
      throw new NotFoundException('JobType not found.');
    }

    const updatedJobType = await this.prisma.jobType.update({
      where: { id },
      data: {
        name: data.name,
        status: data.status,
      },
    });

    return this.formatResponse(req, 200, 'JobType updated successfully', updatedJobType);
  }

  async deleteJobType(req: Request, id: number) {
    const existingJobType = await this.prisma.jobType.findUnique({ where: { id } });

    if (!existingJobType) {
      throw new NotFoundException('JobType not found.');
    }

    await this.prisma.jobType.delete({ where: { id } });

    return this.formatResponse(req, 200, 'JobType deleted successfully', null);
  }
}
