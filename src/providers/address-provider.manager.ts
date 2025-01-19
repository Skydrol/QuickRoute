import { Injectable } from '@nestjs/common';
import { AddressProvider } from './address-provider.interface';
import { TomTomProvider } from '../tomtom/tomtom.provider';

@Injectable()
export class AddressProviderManager {
  private providers: Map<string, AddressProvider> = new Map();

  constructor(private readonly tomTomProvider: TomTomProvider) {
    this.providers.set('tomtom', tomTomProvider);
  }

  getProvider(providerName: string): AddressProvider {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider "${providerName}" not found`);
    }
    return provider;
  }
}
