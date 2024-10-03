import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/healthz')
  getHello(): string {
    return 'ok';
  }
}
