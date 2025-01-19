import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from '../services/address.service';

describe('AddressController', () => {
  let controller: AddressController;
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useValue: {
            getSuggestions: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return suggestions from the AddressService', async () => {
    const mockResult = [
      {
        address: '123 Example St, Sydney, NSW 2000, Australia',
        country: 'Australia',
        municipality: 'Sydney',
        latitude: -33.8688,
        longitude: 151.2093,
      },
    ];

    jest.spyOn(service, 'getSuggestions').mockResolvedValueOnce(mockResult);

    const result = await controller.getSuggestions('Example', 5);
    expect(result).toEqual(mockResult);
    expect(service.getSuggestions).toHaveBeenCalledWith('tomtom', 'Example', 5);
  });

  it('should return an error message if query is missing', async () => {
    const result = await controller.getSuggestions('', 5);
    expect(result).toEqual({ error: 'Query parameter is required' });
  });
});
