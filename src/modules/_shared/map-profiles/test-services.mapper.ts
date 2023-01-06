import { Mapper, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { GetTestServiceDto } from "../dtos/get-test-service.dto";
import { TestServiceEntity } from "../entities";

@Injectable()
export class TestServicesMapperProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, TestServiceEntity, GetTestServiceDto);
        };
    }
}
