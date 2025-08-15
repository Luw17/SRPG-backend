import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MagicDto } from './dto/magic.dto';
import { MagicService } from './magic.service';

@Controller('magic')
export class MagicController {
    constructor(
        private readonly magicService: MagicService
    ) {}


    @Post('add-magic')
    async addMagic(@Body() magicDto: MagicDto) {
        return this.magicService.addMagic(magicDto);

    }

    @Get('get-all-magic')
    async getAllMagic() {
        return this.magicService.getAllMagic();
    }

    @Get('filter-magic')
    async filterMagic(
    @Query('name') name?: string,
    @Query('level') level?: string,
    @Query('type') type?: string) {
    return this.magicService.filterMagic({ name, level, type });
    }
    
    @Delete('delete-magic/:id')
    async deleteMagic(@Param('id') id: string) {
        return this.magicService.deleteMagic(id);
    }
}
