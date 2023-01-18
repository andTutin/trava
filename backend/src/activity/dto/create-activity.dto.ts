import { IsMongoId, IsString } from "class-validator";

export class CreateActivityDto {
    @IsString()
    file: string

    owner: string
}