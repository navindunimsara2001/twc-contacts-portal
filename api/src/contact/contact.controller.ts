import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() data: CreateContactDto) {
        return this.contactService.create(data);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll() {
        return this.contactService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.contactService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateContactDto,
    ) {
        return this.contactService.update(id, data);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.contactService.delete(id);
    }
}