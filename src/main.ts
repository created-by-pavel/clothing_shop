import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import { ResponseTimeInterceptor } from './interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as swaggerUi from 'swagger-ui-express';
import * as express from 'express';
import * as path from 'path';
import { PrismaService } from './prisma/prisma.service';
import handlebarsHelpers from './helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Store API')
    .setDescription('created-by-pavel store API')
    .setVersion('1.0')
    .build();

  const apiJsonPath = '/api-json';
  app.use(apiJsonPath, express.static(path.join(__dirname, 'swagger-json')));

  const document = SwaggerModule.createDocument(app, config);
  const apiDocsPath = '/api-docs';
  app.use(apiDocsPath, swaggerUi.serve, swaggerUi.setup(document));
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalInterceptors(new ResponseTimeInterceptor());
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  hbs.registerHelper('ifEquals', handlebarsHelpers.ifEquals);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
