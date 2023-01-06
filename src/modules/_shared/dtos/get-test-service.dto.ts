import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class GetTestServiceDto {
    @ApiProperty({
        type: "string",
        required: true,
        description: "Third party URL",
    })
    @IsUrl()
    @IsNotEmpty()
    @AutoMap()
    readonly url: string;

    @ApiProperty({
        type: "number",
        required: true,
        description: "Third party service priority",
    })
    @IsNumber()
    @IsNotEmpty()
    @AutoMap()
    readonly priority: number;
}
