import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('files')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('Upload')
  getHello(): string {
    return this.appService.getHello();
  }
}
