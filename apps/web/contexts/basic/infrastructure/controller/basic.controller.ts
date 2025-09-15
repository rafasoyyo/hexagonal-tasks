import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class BasicController {
  constructor() {}

  @Get()
  @Render('./pages/basic.page.pug')
  getHello() {
    return {
      pageName: 'Hello World!',
    };
  }
}
