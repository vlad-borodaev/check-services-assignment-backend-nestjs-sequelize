import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module";
import { AutoMappingModule } from "./auto-mapping.module";
import { GlobalConfigModule } from "./global-config.module";
import { GlobalProvidersModule } from "./global-providers.module";
import { CacheManagerModule } from "./cache-manager.module";
import { ThrottlerManagerModule } from "./throttler-manager.module";

const coreModules = [
    GlobalConfigModule,
    DatabaseModule,
    AutoMappingModule,
    GlobalProvidersModule,
    CacheManagerModule,
    ThrottlerManagerModule,
];

@Module({
    imports: [...coreModules],
    exports: [...coreModules],
})
export class CoreModule { }
