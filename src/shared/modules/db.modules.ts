import { Global, Module } from '@nestjs/common';
import { ConditionalModule, ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from '@task/infrastructure/postgress/task.postgres.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    ConditionalModule.registerWhen(
      MongooseModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => ({
          uri: cfg.get<string>('MONGO_URI'),
        }),
      }),
      (env: NodeJS.ProcessEnv) => !!env['MONGO_URI'],
    ),
    ConditionalModule.registerWhen(
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => ({
          type: 'postgres',
          host: cfg.get<string>('POSTGRES_URI'),
          port: cfg.get<number>('POSTGRES_PORT'),
          username: cfg.get<string>('POSTGRES_USER'),
          password: cfg.get<string>('POSTGRES_PASS'),
          database: cfg.get<string>('POSTGRES_NAME'),
          entities: [Task],
          synchronize: true,
          autoLoadModels: true,
        }),
      }),
      (env: NodeJS.ProcessEnv) => !!env['POSTGRES_URI'],
    ),
  ],
})
export class DBModule {}
