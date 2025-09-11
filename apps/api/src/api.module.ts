import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { BasicService } from './basic/application/basic.service';
import { BasicController } from './basic/infrastructure/http/basic.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGO_URI', 'mongodb://localhost:27017/tasks'),
      }),
    }),
  ],
  controllers: [BasicController],
  providers: [BasicService],
})
export class ApiModule {}
