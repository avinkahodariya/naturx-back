import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = new ConfigService();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();
  app.setGlobalPrefix('api');

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Nature-X')
    .setDescription('Nature-X API description')
    .setVersion('1.1')
    .addBearerAuth()
    // .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    customCss: `
    .swagger-ui .info {
      margin: 5px 0;
    }
    .swagger-ui .scheme-container {
      margin: 0 0 5px;
      padding: 5px 0;
    }    
    `,
    swaggerOptions: {
      persistAuthorization: true,
      tryItOutEnabled: false,
    },
    customSiteTitle: 'Nature-X',
  };

  SwaggerModule.setup('swagger-api', app, document, customOptions);
  const port = configService.get('PORT') || 5100;
  await app.listen(port, '0.0.0.0');
  console.log(`http://localhost:${port}/swagger-api`);
}
bootstrap();
