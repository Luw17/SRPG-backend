// src/charactersheet/dto/create-charactersheet.dto.ts
import { IsString, IsNumber, IsArray, ValidateNested, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class DamageDto {
  @IsNumber()
  quantity: number;

  @IsString()
  die: string;

  @IsString()
  type: string;
}

class CharacterSpellDto {
  @IsString()
  @IsOptional()
  originalId?: string;

  @IsString()
  name: string;

  @IsString()
  level: string; // "Truque", "1", "2"...

  @IsString()
  range: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DamageDto)
  damage: DamageDto[];

  @IsBoolean()
  addSpellMod: boolean;
}

class StatsDto {
  @IsNumber()
  str: number;

  @IsNumber()
  dex: number;

  @IsNumber()
  con: number;

  @IsNumber()
  int: number;

  @IsNumber()
  wis: number;

  @IsNumber()
  cha: number;
}

export class CreateCharactersheetDto {
  @IsString()
  name: string;

  @IsString()
  class: string;

  @IsNumber()
  @Type(() => Number)
  level: number;

  @IsString()
  race: string;

  // --- NOVO CAMPO ---
  @IsNumber()
  @IsOptional() // Opcional para não quebrar fichas antigas ou criações parciais
  @Type(() => Number)
  proficiency: number;
  // ------------------

  @ValidateNested()
  @Type(() => StatsDto)
  stats: StatsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacterSpellDto)
  spells: CharacterSpellDto[];
}