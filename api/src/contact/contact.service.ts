import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Contact } from '@prisma/client';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateContactDto, userId: number): Promise<Contact> {
        return this.prisma.contact.create({
            data: {
                ...data,        
                createdBy: userId, 
            },
        });
    }

    async findAll(userId: number): Promise<Contact[]> {
        if (userId === 1) {
            return this.prisma.contact.findMany();
        }

        return this.prisma.contact.findMany({
            where: {
                createdBy: userId,
            },
        });
    }

    async findOne(id: number): Promise<Contact> {
        const contact = await this.prisma.contact.findUnique({ where: { id } });
        if (!contact) throw new NotFoundException('Contact not found');
        return contact;
    }

    async update(id: number, data: UpdateContactDto): Promise<Contact> {
        await this.findOne(id);  // Throws if contact not found
        return this.prisma.contact.update({ where: { id }, data });
    }

    async delete(id: number): Promise<void> {
        await this.findOne(id);  // Throws if contact not found
        await this.prisma.contact.delete({ where: { id } });
    }
}