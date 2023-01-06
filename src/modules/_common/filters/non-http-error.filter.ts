import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpStatus,
    HttpException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Catch()
export class NonHttpErrorFilter implements ExceptionFilter {
    constructor(
        private configService: ConfigService,
    ) { }

    catch(exception: Error, host: ArgumentsHost) {
        const { message: errMsg, stack: errStack, name: errName } = exception;

        const ctx = host.switchToHttp();
        const res = ctx.getResponse();
        const statusName = "Internal server error";

        if (exception instanceof HttpException) {
            res.status(exception.getStatus()).json(exception.getResponse());
            return;
        }

        const exceptionStatus = (exception as any)?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const commonErrorResp: any = {
            statusCode: exceptionStatus,
            status: exceptionStatus,
            message: `${errName}: ${errMsg}`
        };

        const isStacktraceEnabled = this.configService.get("ENABLE_ERROR_STACKTRACE");

        if (isStacktraceEnabled) {
            commonErrorResp.exception = exception;
            commonErrorResp.errMsg = errMsg;
            commonErrorResp.errStack = errStack;
            commonErrorResp.errName = errName;
            commonErrorResp.statusName = statusName;
        }

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(commonErrorResp);
    }
}
