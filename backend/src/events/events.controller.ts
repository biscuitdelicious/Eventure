import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    UseGuards,
    Body
} from '@nestjs/common';
import { EventsService } from './events.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('events')
@UseGuards(AuthGuard)
export class EventsController {

    constructor(
        private eventsService: EventsService
    ) { }

    // ====== Event endpoints ======

    // Return all events
    @Get()
    findAll() {
        return this.eventsService.findAll();
    }

    // Return event by id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(+id);
    }

    // Create new event
    @Post()
    create(@Body() createDto: any) {
        return this.eventsService.create({
            ...createDto,
            start_date: new Date(createDto.start_date),
            end_date: new Date(createDto.end_date)
        });
    }

    // Update event by id
    @Put(':id')
    update(@Param('id') id: string, @Body() updateDto: any) {
        return this.eventsService.update(+id, updateDto);
    }

    // Delete event by id
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.eventsService.detele(+id);
    }

    // ====== Resource endpoints ======

    @Get(':id/resources')
    async getResources(@Param('id') eventId: string) {
        return this.eventsService.getResources(+eventId);
    }

    @Post(':id/resources')
    async addResource(
        @Param('id')
        eventId: string,
        resourceDto: any
    ) {
        return this.eventsService.addResource(+eventId, resourceDto);
    }

    @Delete(':id/resources/:resourceId')
    async removeResource(@Param('id') eventId: string, @Param('resourceId') resourceId: string) {
        return this.eventsService.removeResource(+resourceId);
    }

}
