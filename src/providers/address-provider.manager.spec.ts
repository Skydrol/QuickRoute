import { Test, TestingModule } from '@nestjs/testing';
import { AddressProviderManager } from './address-provider.manager';
import { TomTomProvider } from '../tomtom/tomtom.provider';
import { AddressProvider } from './address-provider.interface';

describe('AddressProviderManager', () => {
  let manager: AddressProviderManager;
  let tomTomProvider: AddressProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressProviderManager,
        {
          provide: TomTomProvider,
          useValue: {
            getSuggestions: jest.fn(),
          },
        },
      ],
    }).compile();

    manager = module.get<AddressProviderManager>(AddressProviderManager);
    tomTomProvider = module.get<TomTomProvider>(TomTomProvider);
  });

  it('should be defined', () => {
    expect(manager).toBeDefined();
  });

  it('should return the TomTom provider when the name is "tomtom"', () => {
    const provider = manager.getProvider('tomtom');
    expect(provider).toBe(tomTomProvider);
  });

  it('should throw an error if the provider name is not found', () => {
    expect(() => manager.getProvider('invalidProvider')).toThrow(
      'Provider "invalidProvider" not found',
    );
  });
});
