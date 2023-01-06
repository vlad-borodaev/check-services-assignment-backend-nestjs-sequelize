import { MapInterceptor } from "@automapper/nestjs";
import {
    Catch,
    Controller,
    UseInterceptors,
    HttpCode,
    CacheInterceptor,
    Get,
    HttpStatus,
} from "@nestjs/common";
import {
    ApiOkResponse,
    ApiTags,
} from "@nestjs/swagger";
import { TestServicesService } from "./test-services.service";
import { TestServiceEntity } from "@shared/entities";
import { GetTestServiceDto } from "@shared/dtos/get-test-service.dto";

@Controller("services")
@Catch()
@ApiTags("services")
@UseInterceptors(
    CacheInterceptor,
    MapInterceptor(TestServiceEntity, GetTestServiceDto)
)
export class TestServicesController {
    constructor(
        private readonly testServicesService: TestServicesService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: GetTestServiceDto })
    getServerWithHighestPriority() {
        return this.testServicesService.findServer();
    }
}
