
import { PartialType } from '@nestjs/swagger';
import { CreateHiringPostDto } from './create-hiringpost.dto';

export class UpdateHiringPostDto extends PartialType(CreateHiringPostDto) {}
