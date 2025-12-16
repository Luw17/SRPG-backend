import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharactersheetService } from './charactersheet.service';
import { CreateCharactersheetDto } from './dto/create-charactersheet.dto';
import { UpdateCharactersheetDto } from './dto/update-charactersheet.dto';

@Controller('charactersheet')
export class CharactersheetController {
  constructor(private readonly charactersheetService: CharactersheetService) {}

  @Post()
  create(@Body() createCharactersheetDto: CreateCharactersheetDto) {
    return this.charactersheetService.create(createCharactersheetDto);
  }

  @Get()
  findAll() {
    return this.charactersheetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersheetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharactersheetDto: UpdateCharactersheetDto) {
    return this.charactersheetService.update(id, updateCharactersheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersheetService.remove(id);
  }
}