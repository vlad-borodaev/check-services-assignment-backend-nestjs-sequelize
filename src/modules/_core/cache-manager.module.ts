import { CacheInterceptor, CacheModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import * as redisStore from 'cache-manager-redis-store';

type RedisOps = any;

@Module({
    imports: [
        CacheModule.registerAsync<RedisOps>({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                ttl: Number(configService.get<number>('CACHE_TTL')),
                store: redisStore,
                url: `redis://${configService.get("REDIS_HOST")}:${Number(configService.get("REDIS_HOST"))}`,
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [
        CacheModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class CacheManagerModule { }
