import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EventsService {

    constructor(private prisma: PrismaService) { };

    async findAll() {
        return this.prisma.event.findMany({
            include: {
                artists: true,
                resources: true
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.event.findUnique({
            where: { id },
            include: {
                artists: true,
                resources: true
            },
        });
    }

    async create(data: {
        name: string;
        location?: string;
        forecast?: string;
        start_date: Date;
        end_date: Date;
        budget?: number;
    }) {
        return this.prisma.event.create({
            data: data,
        });
    }

    async update(id: number, data: any) {
        return this.prisma.event.update({
            where: { id },
            data: data
        });
    }

    async detele(id: number) {
        return this.prisma.event.delete({
            where: { id }
        });
    }


    async getResources(eventId: number) {
        return this.prisma.resource.findMany({
            where: { event_id: eventId }
        });
    }

    async addResource(eventId: number, data: {
        name: string;
        rented?: boolean;
        quantity?: number;
    }) {
        return this.prisma.resource.create({
            data: {
                ...data,
                event_id: eventId
            }
        });
    }

    async removeResource(resourceId: number) {
        return this.prisma.resource.delete({
            where: { id: resourceId }
        })
    }

}
