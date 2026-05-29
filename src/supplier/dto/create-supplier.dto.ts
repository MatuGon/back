import { IsEmail, IsString, Length, MinLength } from "class-validator"

export class CreateSupplierDto {
    @IsString({ message: 'El nombre debe ser texto' })
    @Length(6, 255, { message: 'El nombre debe tener entre 6 y 255 caracteres' })
    name!: string

    @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
    @Length(6, 255, { message: 'El correo electrónico debe tener entre 6 y 255 caracteres' })
    email!: string

    @IsString({ message: 'el numero de telefono debe ser valido' })
    @MinLength(6, { message: 'el numero de telefono debe tener al menos 6 caracteres' })
    telefono!: string
}