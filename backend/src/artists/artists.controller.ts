import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    UseGuards,
    Body,
    Param
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ArtistsService } from './artists.service';

@Controller('artists')
@UseGuards(AuthGuard)
export class ArtistsController {

    constructor(private artistService: ArtistsService) { }

    @Get()
    findAll() {
        return this.artistService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.artistService.findOne(+id);
    }

    @Post()
    create(@Body() createDto: any) {
        return this.artistService.create({
            ...createDto
        })
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: any) {
        return this.artistService.update(+id, updateDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.artistService.delete(+id);
    }

}
