import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const httpArgumentHost = context.switchToHttp();
        const request = httpArgumentHost.getRequest();
        const response = httpArgumentHost.getResponse();

        const { statusCode } = response;
        const { method, params, query, body, originalUrl } = request;

        const requestString = `${method} ${originalUrl}`;

        const requestLogging = {
            request: requestString,
            params,
            query,
            body,
        };

        console.info("Request:", requestLogging);

        return next
            .handle()
            .pipe(
                tap((data) => {
                    console.info("Response:", {
                        request: requestString,
                        status: statusCode,
                    });
                })
            );
    }
}
