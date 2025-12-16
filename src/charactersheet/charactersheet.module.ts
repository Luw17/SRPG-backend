import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersheetService } from './charactersheet.service';
import { CharactersheetController } from './charactersheet.controller';
import { Character, CharacterSchema } from './charactersheet.schema';

@Module({
  imports: [
    // Registra o Schema neste módulo para que o Service possa injetá-lo
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema }
    ]),
  ],
  controllers: [CharactersheetController],
  providers: [CharactersheetService],
})
export class CharactersheetModule {}