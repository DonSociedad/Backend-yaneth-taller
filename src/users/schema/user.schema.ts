import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../dto/user.dto';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ type: String,
    enum: Object.values(UserRole),
    default: UserRole.EDITOR
   })
  role: UserRole;

  @Prop({ type: String, required: false })
  refreshToken?: string;

  @Prop({ type: String, required: false })
  verificationCode?: string;

  @Prop({ type: Date, required: false })
  verificationCodeExpires?: Date;

  @Prop({ type: String, required: false })
  phoneCode?: string;

  @Prop({ type: Date, required: false })
  phoneCodeExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);