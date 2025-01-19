import { Test, TestingModule } from '@nestjs/testing';
import { TomTomController } from './tomtom.controller';
import { TomTomService } from './tomtom.service';

describe('TomTomController', () => {
  let controller: TomTomController;
  let service: TomTomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TomTomController],
      providers: [
        {
          provide: TomTomService,
          useValue: {
            getSuggestions: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TomTomController>(TomTomController);
    service = module.get<TomTomService>(TomTomService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return suggestions from the service', async () => {
    const mockResult = {
      results: [
        {
          address: {
            freeformAddress: '123 Example St, Sydney, NSW 2000, Australia',
          },
        },
      ],
    };

    jest.spyOn(service, 'getSuggestions').mockResolvedValueOnce(mockResult);

    const result = await controller.getSuggestions('Example', 5);
    expect(result).toEqual(mockResult);
    expect(service.getSuggestions).toHaveBeenCalledWith('Example', 'AU', 5);
  });

  it('should return an error message if query is missing', async () => {
    const result = await controller.getSuggestions('', 5);
    expect(result).toEqual({ error: 'Query parameter is required' });
  });
});
