import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;

  const mockEmployee = {
    id: '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    userId: 'user123',
    photoId: 'photo123',
    positionId: 'position123',
  };

  const mockEmployeesService = {
    create: jest.fn().mockResolvedValue(mockEmployee),
    findAll: jest.fn().mockResolvedValue([mockEmployee]),
    findOne: jest.fn().mockResolvedValue(mockEmployee),
    update: jest.fn().mockResolvedValue(mockEmployee),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        {
          provide: EmployeesService,
          useValue: mockEmployeesService,
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      const dto: CreateEmployeeDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        userId: 'user123',
        photoId: 'photo123',
        positionId: 'position123',
      };
      expect(await controller.create(dto)).toEqual(mockEmployee);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      expect(await controller.findAll()).toEqual([mockEmployee]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single employee', async () => {
      expect(
        await controller.findOne('1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m'),
      ).toEqual(mockEmployee);
      expect(service.findOne).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
      );
    });
  });

  describe('update', () => {
    it('should update an employee', async () => {
      const dto: UpdateEmployeeDto = { email: 'jane.doe@example.com' };
      expect(
        await controller.update('1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m', dto),
      ).toEqual(mockEmployee);
      expect(service.update).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
        dto,
      );
    });
  });

  describe('remove', () => {
    it('should remove an employee', async () => {
      expect(
        await controller.remove('1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m'),
      ).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
      );
    });
  });
});
