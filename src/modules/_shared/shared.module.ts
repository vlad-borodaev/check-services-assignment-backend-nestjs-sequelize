import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TestServiceEntity } from "./entities";
import { TestServicesMapperProfile } from "./map-profiles";
import { TestServicesRepository } from "./repositories";

@Module({
    imports: [
        SequelizeModule.forFeature([
            TestServiceEntity,
        ]),
    ],
    exports: [
        SequelizeModule,
        TestServicesRepository,
        TestServicesMapperProfile,
    ],
    providers: [
        TestServicesRepository,
        TestServicesMapperProfile,
    ],
})
export class SharedModule { }
