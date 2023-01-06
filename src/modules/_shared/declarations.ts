import { CommonEntity } from "./entities/common.entity";

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Result<T> = T | undefined;

export type RepoResult<T> = Promise<Result<T>>;

export interface IRepo<T extends CommonEntity> {
    getAllAsync(): RepoResult<T[]>;
}
