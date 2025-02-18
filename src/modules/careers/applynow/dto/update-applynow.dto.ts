import { PartialType } from '@nestjs/swagger';
import { CreateApplyNowDto } from './create-applynow.dto';

export class UpdateApplyNowDto extends PartialType(CreateApplyNowDto) {}