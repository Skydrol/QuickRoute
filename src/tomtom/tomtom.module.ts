import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TomTomService } from './tomtom.service';
import { TomTomController } from './tomtom.controller';

@Module({
  imports: [HttpModule],
  controllers: [TomTomController],
  providers: [TomTomService],
})
export class TomTomModule {}