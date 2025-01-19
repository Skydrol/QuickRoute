import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TomTomModule } from './tomtom/tomtom.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TomTomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
