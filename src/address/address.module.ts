import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AddressController } from './address.controller';
import { TomTomProvider } from '../tomtom/tomtom.provider';
import { AddressProviderManager } from '../providers/address-provider.manager';
import { AddressService } from '../services/address.service';

@Module({
  imports: [HttpModule],
  controllers: [AddressController],
  providers: [TomTomProvider, AddressProviderManager, AddressService],
})
export class TomTomModule {}
