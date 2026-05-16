import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString({message: 'Full name must be a string'})
    @Length(6, 255, { message: 'Full name must be at least 6 characters long' })
    fullname!: string;

    @IsEmail({}, { message: 'Email must be a valid email address' })
    @Length(6, 255, { message: 'Email must be at least 6 characters long' })
    email!: string;

    @IsString({message: 'Password must be a string'})
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;
}
