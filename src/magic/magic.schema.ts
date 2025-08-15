import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MagicDocument = Magic & Document;

@Schema()
export class DamageDice {
  @Prop({ required: true, type: Number, min: 1 })
  quantity: number;

  @Prop({ required: true })
  die: string;

  @Prop()
  type: string;
}

export const DamageDiceSchema = SchemaFactory.createForClass(DamageDice);

@Schema({ timestamps: true })
export class Magic {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  range: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [DamageDiceSchema], default: [] })
  damage: DamageDice[];

  @Prop({ required: true })
  addSpellMod: boolean;
}

export const MagicSchema = SchemaFactory.createForClass(Magic);
