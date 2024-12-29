import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, Length } from 'class-validator';
import { Gender } from '@prisma/client';

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEnum(Gender)
    gender: Gender;

    @IsEmail()
    email: string;

    @Matches(/^[0-9]{10}$/, {
        message: 'Phone number must be exactly 10 digits',
    })
    phone: string;
}