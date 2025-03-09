import { Test, TestingModule } from '@nestjs/testing';
import { ConnectsController } from './connects.controller';

describe('ConnectsController', () => {
  let controller: ConnectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectsController],
    }).compile();

    controller = module.get<ConnectsController>(ConnectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
