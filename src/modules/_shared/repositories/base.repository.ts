import { Logger } from "@nestjs/common";
import sequelize, { Op } from "sequelize";
import { IRepo, RepoResult } from "../declarations";
import { CommonEntity } from "../entities/common.entity";

export abstract class BaseRepo<T extends CommonEntity> implements IRepo<T> {
    protected Model!: sequelize.ModelStatic<T>;
    protected modelName: string;

    protected readonly logger;

    constructor(Model: sequelize.ModelStatic<T>) {
        this.Model = Model;
        this.modelName = Model?.name || Model?.toString() || "Entity";
        this.logger = new Logger(
            `${this.modelName} repository`
        );
    }

    async getAllAsync(whereClause: object = {}): RepoResult<T[]> {
        try {
            const result = await this.Model.findAll({
                ...whereClause,
            });
            return result;
        } catch (err) {
            this.logger.error(err);
            throw err;
        }
    }
}
