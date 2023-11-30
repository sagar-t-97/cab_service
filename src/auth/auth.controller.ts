import { Body, Controller, Post } from "@nestjs/common";
import { SignupUserDto } from "./signupUser.dto";
import { AuthService } from "./auth.service";
import { AccessToken } from "./accessToken";
import { SigninUserDto } from "./signinUser.dto";

@Controller("/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("/signup")
    async signup(@Body() signupUserDto: SignupUserDto): Promise<AccessToken> {
        const accessToken = await this.authService.signUp(signupUserDto);
        return accessToken;
    }

    @Post("/signin")
    async signin(@Body() signinUserDto: SigninUserDto): Promise<AccessToken> {
        const accessToken = await this.authService.signIn(signinUserDto.email, signinUserDto.password);
        return accessToken;
    }
}
