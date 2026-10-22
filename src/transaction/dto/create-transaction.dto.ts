import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches } from "class-validator";

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsString()
    description: string


    @IsNotEmpty()
    @IsString()
    @Matches(/^(?:0|[1-9]\d{0,12})\.\d{2}$/, {
        message: 'O valor deve ter o formato 150.90',
    })
    value: string

    @IsDateString()
    @IsOptional()
    date?: string

    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    categoryId: number
}
