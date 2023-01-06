import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/_app';
import {
    setupSwagger,
    setupModuleHotReload,
    setupCors,
    setupValidationPipes,
} from "./middlewares";
import { LogLevel } from '@nestjs/common';

const PORT = 4000;

async function bootstrap() {
    const logLevels: LogLevel[] = process.env.NODE_ENV === "development"
        ? ["error", "warn", "log", "debug", "verbose"]
        : ["error"];

    const app = await NestFactory.create(AppModule, {
        logger: logLevels
    });

    setupValidationPipes(app);
    setupCors(app);
    setupSwagger(app);
    setupModuleHotReload(module, app);

    await app.listen(PORT);
}
bootstrap();
