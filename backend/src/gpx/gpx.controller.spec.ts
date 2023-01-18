import { Test, TestingModule } from '@nestjs/testing';
import { GpxController } from './gpx.controller';
import { GpxService } from './gpx.service';

describe('GpxController', () => {
  let controller: GpxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GpxController],
      providers: [GpxService],
    }).compile();

    controller = module.get<GpxController>(GpxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
