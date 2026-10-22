import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CategoryType } from "../enums/CategoryType.js";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(CategoryType)
    type: CategoryType;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
