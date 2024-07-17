import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeDto } from './create-employee.dto';
import { CreatePositionDto } from 'src/positions/dto/create-position.dto';

export class UpdateEmployeeDto {
  email: string;
  position?: CreatePositionDto;
}
