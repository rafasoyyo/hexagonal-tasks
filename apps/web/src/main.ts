import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import express from 'express';
import moment from 'moment';
import { join } from 'path';

import { WebModule } from './web.module';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    WebModule,
    new ExpressAdapter(server),
  );
  const configService: ConfigService = app.get(ConfigService);

  // const ENV = configService.get<string>('ENV', 'dev');
  // const rootPath = ENV === 'prod' ? join(__dirname) : join(__dirname, '..');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  server.locals.moment = moment;
  server.locals.basedir = join(__dirname, 'views');
  app.useStaticAssets(join(__dirname, 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('pug');

  const port = configService.get<number>('WEB_PORT', 3000);
  await app.listen(port);
  console.log(`Web application is running on: http://localhost:${port}`);
}
bootstrap();
