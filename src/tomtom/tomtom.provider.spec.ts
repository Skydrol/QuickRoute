import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { TomTomProvider } from './tomtom.provider';
import { AddressResult } from '../providers/address-provider.interface';
import { AxiosResponse, AxiosHeaders } from 'axios';

describe('TomTomProvider', () => {
  let provider: TomTomProvider;
  let httpService: HttpService;

  beforeAll(() => {
    process.env.TOMTOM_API_KEY = 'mock_api_key';
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TomTomProvider,
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    provider = module.get<TomTomProvider>(TomTomProvider);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should call the TomTom API and return address suggestions', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        results: [
          {
            address: {
              freeformAddress: '123 Example St, Sydney, NSW 2000, Australia',
              country: 'Australia',
              municipality: 'Sydney',
            },
            position: {
              lat: -33.8688,
              lon: 151.2093,
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

    jest.spyOn(httpService.axiosRef, 'get').mockResolvedValueOnce(mockResponse);

    const result: AddressResult[] = await provider.getSuggestions('Example', 5);

    expect(result).toEqual([
      {
        address: '123 Example St, Sydney, NSW 2000, Australia',
        country: 'Australia',
        municipality: 'Sydney',
        latitude: -33.8688,
        longitude: 151.2093,
      },
    ]);

    expect(httpService.axiosRef.get).toHaveBeenCalledWith(
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
    jest.spyOn(httpService.axiosRef, 'get').mockRejectedValueOnce(new Error('API error'));

    await expect(provider.getSuggestions('Example', 5)).rejects.toThrow('API error');
  });
});
