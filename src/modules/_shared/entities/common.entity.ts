import { AutoMap } from "@automapper/classes";
import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    Model,
    PrimaryKey,
    Unique,
    UpdatedAt,
} from "sequelize-typescript";

export abstract class CommonEntity extends Model {
    @PrimaryKey
    @Unique
    @AutoIncrement
    @AllowNull(false)
    @Column({ type: DataType.INTEGER })
    readonly id!: number;

    @AllowNull(false)
    @CreatedAt
    @Column({ type: DataType.DATE })
    readonly created_at!: string;

    @AllowNull(false)
    @UpdatedAt
    @Column({ type: DataType.DATE })
    readonly updated_at!: string;

    @AllowNull
    @DeletedAt
    @Column({ type: DataType.DATE })
    readonly deleted_at?: string;
}
