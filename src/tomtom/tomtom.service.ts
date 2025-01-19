import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TomTomService {
  private readonly baseUrl = 'https://api.tomtom.com/search/2/search';

  constructor(private readonly httpService: HttpService) {}

  async getSuggestions(query: string, countrySet = 'AU', limit = 5): Promise<any> {
    const url = `${this.baseUrl}/${encodeURIComponent(query)}.json`;

    const params = {
      key: process.env.TOMTOM_API_KEY,
      typeahead: true,
      countrySet,
      limit,
    };

    try {
      const response = await firstValueFrom(this.httpService.get(url, { params }));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch suggestions: ${error.message}`);
    }
  }
}
