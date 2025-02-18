import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplyNowDto } from './dto/create-applynow.dto';
import { UpdateApplyNowDto } from './dto/update-applynow.dto';

@Injectable()
export class ApplyNowService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateApplyNowDto) {
    data.hiringPostId = Number(data.hiringPostId); // Convert to number
    const application = await this.prisma.applyNow.create({ data });

    return {
      status: true,
      path: '/api/applynow',
      statusCode: 201,
      message: 'Application submitted successfully',
      data: [application],
      timestamp: new Date().toISOString(),
    };
  }

  async findAll() {
    const applications = await this.prisma.applyNow.findMany({
      include: {
        hiringPost: true,
      },
    });

    return {
      status: true,
      path: '/api/applynow',
      statusCode: 200,
      message: 'Request was successful',
      data: applications,
      timestamp: new Date().toISOString(),
    };
  }

  async findOne(id: number) {
    const application = await this.prisma.applyNow.findUnique({ where: { id } });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return {
      status: true,
      path: `/api/applynow/${id}`,
      statusCode: 200,
      message: 'Request was successful',
      data: [application],
      timestamp: new Date().toISOString(),
    };
  }

  async update(id: number, data: UpdateApplyNowDto) {
    await this.findOne(id); // Check existence
    data.hiringPostId = Number(data.hiringPostId);
    const updatedApplication = await this.prisma.applyNow.update({ where: { id }, data });

    return {
      status: true,
      path: `/api/applynow/${id}`,
      statusCode: 200,
      message: 'Application updated successfully',
      data: [updatedApplication],
      timestamp: new Date().toISOString(),
    };
  }

  async remove(id: number) {
    await this.findOne(id); // Check existence
    await this.prisma.applyNow.delete({ where: { id } });

    return {
      status: true,
      path: `/api/applynow/${id}`,
      statusCode: 200,
      message: 'Application deleted successfully',
      data: [],
      timestamp: new Date().toISOString(),
    };
  }
}
