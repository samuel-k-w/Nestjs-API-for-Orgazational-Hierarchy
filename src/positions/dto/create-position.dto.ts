import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';

export class CreatePositionDto {
  name: string;
  description: string;
  reportsTo?: string;
  leaderId: string;
}
