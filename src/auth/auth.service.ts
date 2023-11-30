import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { SignupUserDto } from "./signupUser.dto";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/users/createUser.dto";
import { JwtService } from "@nestjs/jwt";
import { AccessToken } from "./accessToken";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signUp(signupUserDto: SignupUserDto): Promise<AccessToken> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(signupUserDto.password, saltOrRounds);

        const createUserDto = new CreateUserDto();
        createUserDto.email = signupUserDto.email;
        createUserDto.firstName = signupUserDto.firstName;
        createUserDto.lastName = signupUserDto.lastName;
        createUserDto.passwordHash = hash;
        createUserDto.role = signupUserDto.role;

        const user = await this.userService.create(createUserDto);

        const payload = { sub: user.email, role: user.role };
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }

    async signIn(email: string, password: string): Promise<AccessToken> {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException();
        }

        if (!await bcrypt.compare(password, user.passwordHash)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.email, role: user.role };
        return {
            accessToken: await this.jwtService.signAsync(payload)
        };
    }
}
