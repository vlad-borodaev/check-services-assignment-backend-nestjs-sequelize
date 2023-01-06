import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ttl: Number(configService.get<number>("THROTTLE_TTL")),
                limit: configService.get("NODE_ENV") === "test"
                    ? Number(configService.get<number>("THROTTLE_LIMIT_TEST"))
                    : Number(configService.get<number>("THROTTLE_LIMIT")),
            }),
        }),
    ],
    exports: [
        ThrottlerModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class ThrottlerManagerModule { }
