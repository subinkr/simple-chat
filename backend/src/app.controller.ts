import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('room/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getHello(id);
  }
}
