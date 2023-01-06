import { AutomapperModule } from "@automapper/nestjs";
import { Module } from "@nestjs/common";
import { classes } from "@automapper/classes";

@Module({
    imports: [AutomapperModule.forRoot({
        strategyInitializer: classes()
    })],
    exports: [
        AutomapperModule
    ],
    providers: [],
})
export class AutoMappingModule { }
