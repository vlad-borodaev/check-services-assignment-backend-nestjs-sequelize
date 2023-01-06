import {
    CacheInterceptor,
    CacheKey,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    UseInterceptors
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { AppService } from './app.service';

@Controller()
@SkipThrottle()
@UseInterceptors(CacheInterceptor)
export class AppController {
    constructor(
        private readonly appService: AppService
    ) { }

    @Get("hello-world")
    @CacheKey('hello_world')
    @SkipThrottle(false)
    getHello(): string {
        throw new HttpException("test", HttpStatus.FORBIDDEN)
        // return this.appService.getHello();
    }
}
