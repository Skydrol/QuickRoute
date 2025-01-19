import { Controller, Get, Query } from '@nestjs/common';
import { AddressService } from '../services/address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('suggestions')
  async getSuggestions(
    @Query('query') query: string,
    @Query('limit') limit: number,
  ): Promise<any> {
    if (!query || !limit) {
      return { error: 'Query and limit parameters are required' };
    }   
    return this.addressService.getSuggestions('tomtom', query, limit);
  }
}
