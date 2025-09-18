import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Post('create')
    async createUser(@Body() data) {
        console.log(data);
        return this.userService.createUser(data);
    }
}
