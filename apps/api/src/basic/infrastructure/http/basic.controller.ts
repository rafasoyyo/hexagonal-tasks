import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BasicService } from '../../application/basic.service';

@Controller()
export class BasicController {
  constructor(private readonly basicService: BasicService) {}

  @Get()
  @ApiOperation({ summary: 'Get basic message' })
  @ApiResponse({ status: 201, description: 'Basic message returned' })
  getHello(): string {
    return this.basicService.getHello();
  }
}
