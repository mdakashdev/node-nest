import {
    IsIn,
    IsNotEmpty,
    IsString,
    MaxLength,
} from 'class-validator';

export class CheckHealthDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    serviceName: string;

    @IsIn(['development', 'production', 'test'])
    environment: string;
}
