import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [
        ConfigModule.forRoot(), // Load the .env file
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'), // Get the secret from the .env file
                signOptions: { expiresIn: '3h' }, // Token expiration time
            }),
        }),
    ],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
    exports: [JwtModule],
})
export class AuthModule { }