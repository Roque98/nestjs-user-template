import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ROLES { 
  USER_ROLE = 'USER_ROLE', 
  ADMIN_ROLE = 'ADMIN_ROLE' 
};

@Schema()
export class User extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  phone: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ enum: ROLES, default: ROLES.USER_ROLE })
  role: ROLES;

  @Prop({ default: false, type: Boolean })
  active: boolean;

  @Prop({ default: Date.now(), type: Date })
  createAt: Date;

  @Prop({ default:  Date.now(), type: Date})
  validUntil: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

