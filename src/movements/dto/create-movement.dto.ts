import { Type } from "class-transformer";
import { MovementType } from "@generated";
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMovementDto {

    @IsEnum(MovementType, { message: "movimiento incorrecto" })
    type!: MovementType;

    @IsDateString({ strict: true }, { message: 'fecha no válida' })
    date!: Date;

    @Type(() => Number)
    @IsInt({ message: "cantidad invalida" })
    @Min(0, { message: "no negativo" })
    amount!: number;

    @IsNotEmpty({ message: "precio unit. obligatorio" })
    @Type(() => Number)
    @IsNumber()
    priceUnit!: number;

    @IsNotEmpty({ message: "ID producto obligatorio" })
    @Type(() => Number)
    @IsNumber()
    productId!: number;

    @IsNotEmpty({ message: 'usuario obligatorio' })
    @Type(() => Number)
    @IsNotEmpty()
    userId!: number;
}