import { Injectable } from '@nestjs/common';

export type User = {
    userId: number;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {

    private users: User[] = [
        {
            userId: 1,
            username: "john",
            password: "cena"
        },
        {
            userId: 2,
            username: "batman",
            password: "pass"
        }
    ]

    async findOne(username: string): Promise<User | null> {
        return this.users.find(user => user.username == username);
    }
}
