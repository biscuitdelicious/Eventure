import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ResourcesService {

    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.resource.findMany({
            include: { event: true }
        });
    }

    async findOne(id: number) {
        return this.prisma.resource.findUnique({
            where: { id },
            include: { event: true }
        });
    }

    async create(data: {
        name: string;
        rented: boolean;
        quantity?: number;
        event_id: number;
    }) {
        return this.prisma.resource.create({
            data: data
        });
    }

    async update(id: number, data: any) {
        return this.prisma.resource.update({
            where: { id },
            data: data
        });
    }

    async delete(id: number) {
        return this.prisma.resource.delete({
            where: { id }
        });
    }

}
