import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";
import { TestServicesController } from "./test-services.controller";
import { TestServicesService } from "./test-services.service";

@Module({
    controllers: [TestServicesController],
    imports: [SharedModule],
    exports: [],
    providers: [TestServicesService],
})
export class TestServicesModule { }
