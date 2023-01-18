import { IsDateString, IsNotEmpty, IsString } from "class-validator"

export class UpdateActivityDto {
    @IsString()
    @IsNotEmpty()
    title: string
    
    @IsDateString()
    date: Date
  
    @IsString()
    @IsNotEmpty()
    description: string
}
