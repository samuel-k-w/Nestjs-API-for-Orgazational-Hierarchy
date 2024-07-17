import { IsUUID, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;

  // @IsUUID()
  @IsOptional()
  userId?: string;

  // @IsUUID()
  @IsOptional()
  photoId?: string;

  // @IsUUID()
  @IsOptional()
  positionId?: string;
}
