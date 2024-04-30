import { PartialType } from '@nestjs/mapped-types';
import { CreateMeatDto } from './create-meat.dto';

export class UpdateMeatDto extends PartialType(CreateMeatDto) {}
