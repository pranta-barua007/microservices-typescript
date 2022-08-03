import { prop, getModelForClass } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class User {
    @prop({ required: true, unique: true, type: () => mongoose.Schema.Types.String })
    public email!: string;

    @prop({ required: true, type: () => mongoose.Schema.Types.String })
    public password!: string;
}

export const UserModel = getModelForClass(User);

