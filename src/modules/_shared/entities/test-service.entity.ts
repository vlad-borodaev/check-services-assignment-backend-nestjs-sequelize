import { AutoMap } from "@automapper/classes";
import {
    AllowNull,
    Column,
    DataType,
    IsNumeric,
    IsUrl,
    NotNull,
    Table
} from "sequelize-typescript";
import { CommonEntity } from "./common.entity";

@Table({
    timestamps: true,
    paranoid: true,
    modelName: "TestServices"
})
export class TestServiceEntity extends CommonEntity {
    @AllowNull(false)
    @NotNull
    @IsUrl
    @AutoMap()
    @Column({ type: DataType.STRING(1024) })
    url!: string;

    @AllowNull(false)
    @NotNull
    @IsNumeric
    @AutoMap()
    @Column({ type: DataType.INTEGER })
    priority!: number;
}
