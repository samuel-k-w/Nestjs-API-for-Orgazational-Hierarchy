import { Test, TestingModule } from '@nestjs/testing';
import { PositionsController } from 'src/positions/positions.controller';
import { PositionsService } from 'src/positions/positions.service';
import { CreatePositionDto } from 'src/positions/dto/create-position.dto';
import { UpdatePositionDto } from 'src/positions/dto/update-position.dto';

describe('PositionsController', () => {
  let controller: PositionsController;
  let service: PositionsService;

  const mockPosition = {
    id: '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
    name: 'CEO',
    description: 'Chief Executive Officer',
    reportsTo: null,
    leaderId: 'a1b2c3d4-e5f6-7g8h-9i10-11j12k13l14m',
  };

  const mockPositionsService = {
    create: jest.fn().mockResolvedValue(mockPosition),
    findAll: jest.fn().mockResolvedValue([mockPosition]),
    findOne: jest.fn().mockResolvedValue(mockPosition),
    update: jest.fn().mockResolvedValue(mockPosition),
    remove: jest.fn().mockResolvedValue(undefined),
    getTrees: jest.fn().mockResolvedValue([mockPosition]),
    getTreeDetail: jest.fn().mockResolvedValue([mockPosition]),
    getTreeString: jest.fn().mockResolvedValue('CEO\n'),
    getTreeStringFromPosition: jest.fn().mockResolvedValue('CEO\n'),
    getRoots: jest.fn().mockResolvedValue([mockPosition]),
    getDescendants: jest.fn().mockResolvedValue([mockPosition]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PositionsController],
      providers: [
        {
          provide: PositionsService,
          useValue: mockPositionsService,
        },
      ],
    }).compile();

    controller = module.get<PositionsController>(PositionsController);
    service = module.get<PositionsService>(PositionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new position', async () => {
      const dto: CreatePositionDto = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
        leaderId: 'a1b2c3d4-e5f6-7g8h-9i10-11j12k13l14m',
      };
      expect(await controller.create(dto)).toEqual(mockPosition);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of positions', async () => {
      expect(await controller.findAll()).toEqual([mockPosition]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single position', async () => {
      expect(
        await controller.findOne('1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m'),
      ).toEqual(mockPosition);
      expect(service.findOne).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
      );
    });
  });

  describe('update', () => {
    it('should update a position', async () => {
      const dto: UpdatePositionDto = { name: 'CEO Updated' };
      expect(
        await controller.update('1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m', dto),
      ).toEqual(mockPosition);
      expect(service.update).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
        dto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a position', async () => {
      expect(
        await controller.remove('1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m'),
      ).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
      );
    });
  });

  describe('getTrees', () => {
    it('should return a tree of positions', async () => {
      expect(await controller.getTrees()).toEqual([mockPosition]);
      expect(service.getTrees).toHaveBeenCalled();
    });
  });

  describe('getTreeDetail', () => {
    it('should return a detailed tree of positions', async () => {
      expect(await controller.getTreesDetail()).toEqual([mockPosition]);
      expect(service.getTreeDetail).toHaveBeenCalled();
    });
  });

  describe('getTree', () => {
    it('should return a string representation of the tree', async () => {
      expect(await controller.getTree()).toEqual('CEO\n');
      expect(service.getTreeString).toHaveBeenCalled();
    });
  });

  describe('getTreeFromPosition', () => {
    it('should return a string representation of the tree from a specific position', async () => {
      expect(
        await controller.getTreeFromPosition(
          '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
        ),
      ).toEqual('CEO\n');
      expect(service.getTreeStringFromPosition).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
      );
    });
  });

  describe('getRoots', () => {
    it('should return root positions', async () => {
      expect(await controller.getRoots()).toEqual([mockPosition]);
      expect(service.getRoots).toHaveBeenCalled();
    });
  });

  describe('getDescendants', () => {
    it('should return descendants of a position', async () => {
      expect(
        await controller.getDescendants('1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m'),
      ).toEqual([mockPosition]);
      expect(service.getDescendants).toHaveBeenCalledWith(
        '1a2b3c4d-5e6f-7g8h-9i10-11j12k13l14m',
      );
    });
  });
});
