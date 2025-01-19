import { Test, TestingModule } from '@nestjs/testing';
import { TomTomModule } from './tomtom.module';
import { TomTomService } from './tomtom.service';
import { TomTomController } from './tomtom.controller';

describe('TomTomModule', () => {
  let testingModule: TestingModule;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      imports: [TomTomModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(testingModule).toBeDefined();
  });

  it('should provide TomTomService', () => {
    const service = testingModule.get<TomTomService>(TomTomService);
    expect(service).toBeDefined();
  });

  it('should provide TomTomController', () => {
    const controller = testingModule.get<TomTomController>(TomTomController);
    expect(controller).toBeDefined();
  });
});
