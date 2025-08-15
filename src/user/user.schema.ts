import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'player' })
  role: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Character' }], default: [] })
  personagens: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Campaign' }], default: [] })
  campanhas: Types.ObjectId[];

  @Prop({ type: [{ type: String }], default: [] })
  anotacoes: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
