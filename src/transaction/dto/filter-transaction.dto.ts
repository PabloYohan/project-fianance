import { Type } from "class-transformer";
import { IsOptional, IsDateString, IsNumber, IsInt, IsPositive } from "class-validator";

export class FilterTransactionDto {
    
    @IsDateString()
    @IsOptional()
    startDate? : string;

    @IsDateString()
    @IsOptional()
    endDate?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    categoryId?: number;
}