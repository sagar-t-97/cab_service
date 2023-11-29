import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./createUser.dto";
import { User } from "./user.entity";

@Controller("/user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        const user = await this.userService.create(createUserDto);
        return user;
    }
}
