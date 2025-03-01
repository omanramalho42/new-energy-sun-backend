import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(
    // {
    //   origin: ["https://meu-frontend.com", "http://localhost:3000", "*"],
    //   methods: "GET, POST, PUT, DELETE, OPTIONS",
    //   allowedHeaders: "Content-Type, Authorization",
    // }
    {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
);  

  app.useGlobalPipes(new ValidationPipe())
  
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
