import { INestApplication } from "@nestjs/common";
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from "@nestjs/swagger";

export const setupSwagger = (app: INestApplication): void => {
    const documentBuilder = new DocumentBuilder()
        .setTitle("Check Service Status API")
        .setDescription("Check Service Status API docs")
        .setVersion("1.0");

    const swaggerConfig = documentBuilder
        .build();

    const swaggerOptions: SwaggerDocumentOptions = {
        deepScanRoutes: true,
        operationIdFactory: (
            controllerKey: string,
            methodKey: string
        ) => {
            return `${controllerKey}#${methodKey}`;
        },
    };

    // downloadable JSON is available under /docs-json
    // downloadable YAML is available under /docs-yaml
    const swaggerDocument = SwaggerModule.createDocument(
        app,
        swaggerConfig,
        swaggerOptions
    );
    SwaggerModule.setup("docs", app, swaggerDocument, {
        explorer: true,
        customSiteTitle: "Check Service Status API",
        swaggerOptions: {
            tagsSorter: "alpha",
            operationsSorter: "alpha",
        },
    });
};
