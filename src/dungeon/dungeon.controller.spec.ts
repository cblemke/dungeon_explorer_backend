import { Test, TestingModule } from '@nestjs/testing';
import { DungeonController } from './dungeon.controller';

describe('DungeonController', () => {
  let controller: DungeonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DungeonController],
    }).compile();

    controller = module.get<DungeonController>(DungeonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
