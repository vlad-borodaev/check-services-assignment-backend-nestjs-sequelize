import {
    NonHttpErrorFilter,
    TimeoutInterceptor,
    RequestLoggerInterceptor,
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
    ]
})
export class GlobalProvidersModule { }
