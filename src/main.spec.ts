import { bootstrap } from './main';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('main.ts', () => {
  it('should create the app and listen on the correct port', async () => {
    const mockApp = { listen: jest.fn() };
    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);

    await bootstrap();

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(mockApp.listen).toHaveBeenCalledWith(process.env.PORT ?? 3000);
  });
});
