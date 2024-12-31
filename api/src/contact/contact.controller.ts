import { Controller, Post, Get, Body, Param, Patch, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestWithUser } from 'src/types/request-with-user';

@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService) { }

    @Post()
    @UseGuards(AuthGuard)
    async create(@Body() data: CreateContactDto, @Req() request: RequestWithUser) {
        return this.contactService.create(data, request.user.sub);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(@Req() request: RequestWithUser) {
        return this.contactService.findAll(request.user.sub);
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