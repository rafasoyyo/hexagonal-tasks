import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { BasicModule } from './basic/basic.module';
import { TasksModule } from './task/task.cli.module';

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
    BasicModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class CLIModule {}
