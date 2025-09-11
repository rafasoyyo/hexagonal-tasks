import { Controller, Get } from '@nestjs/common';
import { ApiService } from '../../application/api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }
}
