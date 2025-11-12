import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class ArtistsService {

    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.artist.findMany({
            include: { event: true }
        });
    }

    async findOne(id: number) {
        return this.prisma.artist.findUnique({
            where: { id },
            include: {
                event: true
            }
        });
    }

    async create(data: {
        name: string;
        surname?: string;
        genre?: string;
        contact_info?: string;
        available_date?: string;
        event_id: number;
    }) {
        return this.prisma.artist.create({
            data: data,
        });
    }

    async update(id: number, data: any) {
        return this.prisma.artist.update({
            where: { id },
            data: data
        });
    }

    async delete(id: number) {
        return this.prisma.artist.delete({
            where: { id }
        })
    }

}
