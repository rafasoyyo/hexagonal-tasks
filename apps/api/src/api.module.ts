import { Module } from '@nestjs/common';

import { ApiService } from './basic/application/api.service';
import { ApiController } from './basic/infrastructure/http/api.controller';

@Module({
  imports: [],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
