import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./createUser.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @Inject("USER_REPOSITORY")
        private userRepository: Repository<User>,
    ) { }

    async create(userDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(userDto.password, saltOrRounds);
        const user = this.userRepository.create({
            ...userDto,
            password: hash,
            createdAt: new Date()
        });
        const savedUser = await this.userRepository.save(user);
        return savedUser;
    }
}
