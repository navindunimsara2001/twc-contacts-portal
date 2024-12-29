// auth.guard.ts
import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';  // We will use JWT for authentication

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

        if (!token) {
            return false; // Token is required for authentication
        }

        try {
            const payload = this.jwtService.verify(token); // Verify JWT token
            request.user = payload; // Attach user to request object
            return true;
        } catch (e) {
            return false; // If the token is invalid
        }
    }
}