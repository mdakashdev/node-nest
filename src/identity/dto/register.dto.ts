//name, email, password
import {
    IsString,
    IsEmail,
    IsNotEmpty,
    MaxLength,
    MinLength,
} from 'class-validator'

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(40)
    password!: string;
}