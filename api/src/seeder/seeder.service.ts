import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService implements OnModuleInit {
    constructor(private readonly prisma: PrismaService) { }

    async onModuleInit() {
        await this.seedAdminUser();
    }

    private async seedAdminUser() {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: 'admin@admin.com' },
        });

        if (!existingUser) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            await this.prisma.user.create({
                data: {
                    email: 'admin@admin.com',
                    password: hashedPassword,
                },
            });
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    }
}
