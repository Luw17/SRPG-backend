// src/character/schemas/character.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

// --- Sub-schema: Dano ---
@Schema({ _id: false }) // _id: false economiza espaço, pois é só um dado estrutural
export class Damage {
  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  die: string;

  @Prop({ required: true })
  type: string;
}
const DamageSchema = SchemaFactory.createForClass(Damage);

// --- Sub-schema: Magia na Ficha ---
@Schema()
export class CharacterSpell {
  // Caso queira linkar com a magia original (opcional)
  @Prop({ required: false })
  originalId?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  range: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [DamageSchema], default: [] })
  damage: Damage[];

  @Prop({ default: false })
  addSpellMod: boolean;
}
const CharacterSpellSchema = SchemaFactory.createForClass(CharacterSpell);

// --- Sub-schema: Atributos (Stats) ---
@Schema({ _id: false })
export class Stats {
  @Prop({ required: true, default: 10 })
  str: number;

  @Prop({ required: true, default: 10 })
  dex: number;

  @Prop({ required: true, default: 10 })
  con: number;

  @Prop({ required: true, default: 10 })
  int: number;

  @Prop({ required: true, default: 10 })
  wis: number;

  @Prop({ required: true, default: 10 })
  cha: number;
}
const StatsSchema = SchemaFactory.createForClass(Stats);

// --- Schema Principal: Character ---
@Schema({ timestamps: true }) // Adiciona createdAt e updatedAt automaticamente
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  class: string;

  @Prop({ required: true, min: 1, default: 1 })
  level: number;

  @Prop({ required: true })
  race: string;

  // --- NOVO CAMPO: Bônus de Proficiência ---
  @Prop({ required: true, default: 2 }) 
  proficiency: number;
  // ----------------------------------------

  @Prop({ type: StatsSchema, required: true })
  stats: Stats;

  // Aqui salvamos o array de magias completo (Snapshot)
  @Prop({ type: [CharacterSpellSchema], default: [] })
  spells: CharacterSpell[];
}

export const CharacterSchema = SchemaFactory.createForClass(Character);