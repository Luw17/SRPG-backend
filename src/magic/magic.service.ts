import { Injectable } from '@nestjs/common';
import { MagicDto } from './dto/magic.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Magic, MagicDocument } from './magic.schema';
import { Model } from 'mongoose';

@Injectable()
export class MagicService {
  constructor(
    @InjectModel(Magic.name) private magicModel: Model<MagicDocument>,
  ) {}

  async addMagic(magicDto: MagicDto): Promise<Magic> {
    const createdMagic = new this.magicModel(magicDto);
    return createdMagic.save();
  }

  async getAllMagic(): Promise<Magic[]> {
    return this.magicModel.find().exec();
  }

async filterMagic(filters: {
    name?: string;
    level?: string;
    type?: string;
  }): Promise<Magic[]> {
    const query: any = {};

    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }

    if (filters.level) {
      query.level = filters.level;
    }

    if (filters.type) {
      query['damage.type'] = filters.type;
    }

    return this.magicModel.find(query).exec();
  }

  async deleteMagic(id: string): Promise<{ deleted: boolean }> {
    const result = await this.magicModel.deleteOne({ _id: id }).exec();
    return { deleted: result.deletedCount > 0 };
  }
}
