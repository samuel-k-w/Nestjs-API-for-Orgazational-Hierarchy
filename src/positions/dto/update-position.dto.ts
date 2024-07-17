import { PartialType } from '@nestjs/swagger';
import { CreatePositionDto } from './create-position.dto';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';

export class UpdatePositionDto {
  name?: string;
  description?: string;
  reportsTo?: string;
  leaderId?: string;
}
