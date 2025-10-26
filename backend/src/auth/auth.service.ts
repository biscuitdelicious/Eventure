import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { useAnimatedReaction } from 'react-native-reanimated';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(username: string, password: string): Promise<{ jwt_token: string }> {
        const user = await this.usersService.findOne(username);

        // Check if user exists and matches password
        if (user?.password !== password) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.userId,
            username: user.username
        };

        return {
            jwt_token: await this.jwtService.signAsync(payload),
        };
    }
}
