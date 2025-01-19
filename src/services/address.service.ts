import { Injectable } from '@nestjs/common';
import { AddressProviderManager } from '../providers/address-provider.manager';
import { AddressResult } from '../providers/address-provider.interface';

@Injectable()
export class AddressService {
  constructor(private readonly providerManager: AddressProviderManager) {}

  async getSuggestions(providerName: string, query: string, limit: number): Promise<AddressResult[]> {
    const provider = this.providerManager.getProvider(providerName);    
    return provider.getSuggestions(query, limit);
  }
}
