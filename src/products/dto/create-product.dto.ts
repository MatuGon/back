import {IsNumber, IsString, Length } from "class-validator";

export class CreateProductDto {

    @IsString()
    @Length(3, 50, {message: 'El nombre debe tener entre 3 y 50 caracteres'})
    name!: string;

    @IsNumber({}, {message: 'El stock debe ser un número'})
    stock!: number;

    @IsNumber({}, {message: 'El precio debe ser un número'})
    priceUnit!: number;

    @IsNumber({}, {message: 'La categoría debe ser una existente'})
    categoryId!: number;
}