export interface AddressProvider {
  getSuggestions(query: string, limit?: number): Promise<AddressResult[]>;
}

export interface AddressResult {
  address: string;
  country: string;
  municipality?: string;
  latitude: number;
  longitude: number;
}
