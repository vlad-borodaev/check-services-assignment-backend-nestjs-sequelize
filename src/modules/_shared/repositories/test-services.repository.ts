import { RepoResult } from "../declarations";
import { TestServiceEntity } from "../entities";
import { BaseRepo } from "./base.repository";

export class TestServicesRepository extends BaseRepo<TestServiceEntity> {
    constructor() {
        super(TestServiceEntity);
    }

    override async getAllAsync(whereClause: object = {}): RepoResult<TestServiceEntity[]> {
        try {
            const result = await this.Model.findAll({
                ...whereClause,
                limit: 15,
            });
            return result;
        } catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
}
