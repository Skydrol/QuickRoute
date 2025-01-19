import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { AddressProviderManager } from '../providers/address-provider.manager';
import { AddressProvider, AddressResult } from '../providers/address-provider.interface';

describe('AddressService', () => {
  let service: AddressService;
  let providerManager: AddressProviderManager;
  let mockProvider: AddressProvider;

  beforeEach(async () => {
    mockProvider = {
      getSuggestions: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: AddressProviderManager,
          useValue: {
            getProvider: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    providerManager = module.get<AddressProviderManager>(AddressProviderManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return suggestions from the specified provider', async () => {
    const mockResults: AddressResult[] = [
      {
        address: '123 Example St, Sydney, NSW 2000, Australia',
        country: 'Australia',
        municipality: 'Sydney',
        latitude: -33.8688,
        longitude: 151.2093,
      },
    ];

    jest.spyOn(providerManager, 'getProvider').mockReturnValueOnce(mockProvider);
    jest.spyOn(mockProvider, 'getSuggestions').mockResolvedValueOnce(mockResults);

    const result = await service.getSuggestions('tomtom', 'Example', 5);

    expect(result).toEqual(mockResults);
    expect(providerManager.getProvider).toHaveBeenCalledWith('tomtom');
    expect(mockProvider.getSuggestions).toHaveBeenCalledWith('Example', 5);
  });

  it('should throw an error if the provider is not found', async () => {
    jest.spyOn(providerManager, 'getProvider').mockImplementationOnce(() => {
      throw new Error('Provider "invalidProvider" not found');
    });

    await expect(service.getSuggestions('invalidProvider', 'Example', 5)).rejects.toThrow(
      'Provider "invalidProvider" not found',
    );
  });

  it('should throw an error if the provider fails to fetch suggestions', async () => {
    jest.spyOn(providerManager, 'getProvider').mockReturnValueOnce(mockProvider);
    jest.spyOn(mockProvider, 'getSuggestions').mockRejectedValueOnce(new Error('API error'));

    await expect(service.getSuggestions('tomtom', 'Example', 5)).rejects.toThrow('API error');
  });
});
