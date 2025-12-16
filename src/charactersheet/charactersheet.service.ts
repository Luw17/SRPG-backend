import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCharactersheetDto } from './dto/create-charactersheet.dto';
import { UpdateCharactersheetDto } from './dto/update-charactersheet.dto';
import { Character, CharacterDocument } from './charactersheet.schema';

@Injectable()
export class CharactersheetService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
  ) {}

  async create(createCharactersheetDto: CreateCharactersheetDto): Promise<Character> {
    const createdCharacter = new this.characterModel(createCharactersheetDto);
    return createdCharacter.save();
  }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findOne(id: string): Promise<Character> {
    const character = await this.characterModel.findById(id).exec();
    if (!character) {
      throw new NotFoundException(`Ficha de personagem com ID ${id} não encontrada`);
    }
    return character;
  }

  async update(id: string, updateCharactersheetDto: UpdateCharactersheetDto): Promise<Character> {
    const updatedCharacter = await this.characterModel
      .findByIdAndUpdate(id, updateCharactersheetDto, { new: true }) // { new: true } retorna o objeto atualizado
      .exec();

    if (!updatedCharacter) {
      throw new NotFoundException(`Ficha de personagem com ID ${id} não encontrada`);
    }
    return updatedCharacter;
  }

  async remove(id: string): Promise<Character> {
    const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
    
    if (!deletedCharacter) {
      throw new NotFoundException(`Ficha de personagem com ID ${id} não encontrada`);
    }
    return deletedCharacter;
  }
}