import {
    NonHttpErrorFilter,
    TimeoutInterceptor,
    RequestLoggerInterceptor,
    HttpCacheInterceptor
} from "@modules/_common";
import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";

@Module({
    imports: [],
    exports: [],
    providers: [
        {
            provide: APP_FILTER,
            useClass: NonHttpErrorFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: TimeoutInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestLoggerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpCacheInterceptor,
        }
    ]
})
export class GlobalProvidersModule { }
