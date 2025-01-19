import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AddressProvider, AddressResult } from '../providers/address-provider.interface';

@Injectable()
export class TomTomProvider implements AddressProvider {
  private readonly baseUrl = 'https://api.tomtom.com/search/2/search';
  private readonly apiKey = process.env.TOMTOM_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getSuggestions(query: string, limit: number): Promise<AddressResult[]> {    
    const url = `${this.baseUrl}/${encodeURIComponent(query)}.json`;
    const params = { key: this.apiKey, typeahead: true, countrySet: 'AU', limit };

    const response = await this.httpService.axiosRef.get(url, { params });
    return response.data.results.map((result: any) => ({
      address: result.address.freeformAddress,
      country: result.address.country,
      municipality: result.address.municipality,
      latitude: result.position.lat,
      longitude: result.position.lon,
    }));
  }
}
