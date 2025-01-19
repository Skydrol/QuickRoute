import { Test, TestingModule } from '@nestjs/testing';
import { TomTomModule } from './address.module';
import { AddressService } from '../services/address.service';
import { AddressProviderManager } from '../providers/address-provider.manager';
import { TomTomProvider } from '../tomtom/tomtom.provider';
import { AddressController } from './address.controller';

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

  it('should provide AddressService', () => {
    const service = testingModule.get<AddressService>(AddressService);
    expect(service).toBeDefined();
  });

  it('should provide AddressProviderManager', () => {
    const manager = testingModule.get<AddressProviderManager>(AddressProviderManager);
    expect(manager).toBeDefined();
  });

  it('should provide TomTomProvider', () => {
    const provider = testingModule.get<TomTomProvider>(TomTomProvider);
    expect(provider).toBeDefined();
  });

  it('should provide AddressController', () => {
    const controller = testingModule.get<AddressController>(AddressController);
    expect(controller).toBeDefined();
  });
});
