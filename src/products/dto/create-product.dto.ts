import { Type } from "class-transformer";
import {IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {

    @IsString()
    @Length(3, 50, {message: 'El nombre debe tener entre 3 y 50 caracteres'})
    name!: string;

    @Type(() => Number)
    @IsNumber({}, {message: 'El stock debe ser un número'})
    stock!: number;

    @Type(() => Number)
    @IsNumber({}, {message: 'El precio debe ser un número'})
    priceUnit!: number;

    @Type(() => Number)
    @IsNumber({}, {message: 'La categoría debe ser una existente'})
    categoryId!: number;
}