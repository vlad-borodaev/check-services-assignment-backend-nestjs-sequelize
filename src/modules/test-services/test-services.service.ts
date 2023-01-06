import { TestServicesRepository } from "@shared/repositories";
import {
    HttpStatus,
    Injectable,
    NotFoundException,
    ServiceUnavailableException
} from "@nestjs/common";
import { TestServiceEntity } from "@shared/entities";
import { wrapPromiseWithTimeout } from "@common/utils";
import axios from "axios";

type ServiceWithResponceDto = {
    service: TestServiceEntity;
    status: HttpStatus;
};

const RESPONSE_TIMEOUT_MS = 5000;

@Injectable()
export class TestServicesService {
    constructor(
        private testServicesRepository: TestServicesRepository,
    ) { }

    async findServer(): Promise<TestServiceEntity> {
        const services = await this.getServerListDescAsync();

        if (services.length === 0) {
            throw new NotFoundException({ messages: "The services are not set up" });
        }

        const requests = services.map((srv) => {
            return wrapPromiseWithTimeout(axios.get(srv.url), RESPONSE_TIMEOUT_MS)
                .then((resp) => resp?.status || HttpStatus.SERVICE_UNAVAILABLE)
                .catch((err) => err?.status || HttpStatus.SERVICE_UNAVAILABLE);
        });

        const responsesWithServices = await Promise.all(requests)
            .then((responses: HttpStatus[]) => this.mapServicesToResponses(services, responses));

        const result = responsesWithServices
            .filter((respWithService) => {
                return respWithService.status >= 200 && respWithService.status <= 299;
            });

        if (result.length === 0) {
            throw new ServiceUnavailableException({ message: "All the services are not available" });
        }

        return result[0]?.service;
    }

    private getServerListDescAsync(): Promise<TestServiceEntity[]> {
        // return this.getServicesFromArrayByPriorityDesc();
        return this.getServicesFromDbByPriorityDesc();
    }

    private getServicesFromArrayByPriorityDesc(): Promise<TestServiceEntity[]> {
        const services = [
            {
                "url": "https://does-not-work.perfume.new",
                "priority": 1
            },
            {
                "url": "https://gitlab.com",
                "priority": 4
            },
            {
                "url": "http://app.scnt.me",
                "priority": 3
            },
            {
                "url": "https://offline.scentronix.com",
                "priority": 2
            }
        ];
        const sortedList = services
            .sort(((curr, prev) => (curr.priority > prev.priority) ? 1 : -1))
            .reverse();
        return Promise.resolve(sortedList as TestServiceEntity[]);
    }

    private async getServicesFromDbByPriorityDesc(): Promise<TestServiceEntity[]> {
        return await this.testServicesRepository.getAllAsync({
            order: [
                ["priority", "DESC"],
            ],
            limit: 15,
        });
    }

    private mapServicesToResponses(
        services: TestServiceEntity[],
        responses: HttpStatus[]
    ): ServiceWithResponceDto[] {
        const result: ServiceWithResponceDto[] = services.map((srv, index) => ({
            service: srv,
            status: responses[index],
        }));
        return result;
    }
}
