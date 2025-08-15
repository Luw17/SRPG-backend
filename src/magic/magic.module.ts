import { Module } from '@nestjs/common';
import { MagicService } from './magic.service';
import { MagicController } from './magic.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Magic, MagicSchema } from './magic.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Magic.name, schema: MagicSchema }]),],
  providers: [MagicService],
  controllers: [MagicController]
})
export class MagicModule {}
