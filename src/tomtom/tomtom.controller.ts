import { Controller, Get, Query } from '@nestjs/common';
import { TomTomService } from './tomtom.service';

@Controller('tomtom')
export class TomTomController {
  constructor(private readonly tomTomService: TomTomService) {}

  @Get('suggestions')
  async getSuggestions(
    @Query('query') query: string,
    @Query('limit') limit: number = 5,
  ): Promise<any> {
    if (!query) {
      return { error: 'Query parameter is required' };
    }
    return this.tomTomService.getSuggestions(query, 'AU', limit);
  }
}
