import { IsString } from "class-validator";
import mongoose from "mongoose";

export class CreateActivityDto {
    @IsString()
    owner: mongoose.Types.ObjectId

    @IsString()
    file: string
}