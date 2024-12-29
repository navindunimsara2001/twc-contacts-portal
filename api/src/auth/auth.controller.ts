import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Register a new user
    @Post('register')
    async register(@Body() userDto: UserDto) {
        return this.authService.register(userDto);
    }

    // Login a user
    @Post('login')
    async login(@Body() userDto: UserDto) {
        return this.authService.login(userDto.email, userDto.password);
    }
}