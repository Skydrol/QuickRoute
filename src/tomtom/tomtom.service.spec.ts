import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { TomTomService } from './tomtom.service';
import { of } from 'rxjs';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('TomTomService', () => {
  let service: TomTomService;
  let httpService: HttpService;

  beforeAll(() => {
    process.env.TOMTOM_API_KEY = 'mock_api_key';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TomTomService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TomTomService>(TomTomService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call the TomTom API with countrySet=AU and return suggestions', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        results: [
          {
            address: {
              freeformAddress: '123 Example St, Sydney, NSW 2000, Australia',
            },
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: new AxiosHeaders(),
      config: {
        headers: new AxiosHeaders(),
      },
    };
    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));
    const result = await service.getSuggestions('Example');
    expect(result).toEqual(mockResponse.data);
    expect(httpService.get).toHaveBeenCalledWith(
      'https://api.tomtom.com/search/2/search/Example.json',
      {
        params: {
          key: 'mock_api_key',
          typeahead: true,
          countrySet: 'AU',
          limit: 5,
        },
      },
    );
  });

  it('should throw an error if the API call fails', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => {
      throw new Error('API error');
    });
    await expect(service.getSuggestions('Example')).rejects.toThrow(
      'Failed to fetch suggestions: API error',
    );
  });
});
