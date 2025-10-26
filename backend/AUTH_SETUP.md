# JWT Authentication Setup Guide

## Overview
This backend implements JWT (JSON Web Token) authentication following the NestJS official tutorial approach.

## Installation

First, install the required dependencies:

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt
```

## Project Structure

```
src/
├── auth/
│   ├── users/
│   │   ├── users.service.ts      # User data management
│   │   └── users.module.ts       # Users module configuration
│   ├── auth.controller.ts        # Authentication endpoints
│   ├── auth.service.ts           # Authentication logic
│   ├── auth.module.ts            # Auth module configuration
│   ├── auth.guard.ts             # JWT validation guard
│   └── constants.ts              # JWT configuration constants
└── app.module.ts
```

## Environment Setup

Create a `.env` file in the backend root directory:

```env
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=1h
```

**Important:** Never commit your `.env` file to version control!

## How It Works

### 1. User Login (POST /auth/login)

**Request:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "changeme"}'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Access Protected Routes (GET /auth/profile)

**Request:**
```bash
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "sub": 1,
  "username": "john",
  "iat": 1516239022,
  "exp": 1516242622
}
```

## Test Users

Currently using mock data (replace with real database later):

| Username | Password   |
|----------|------------|
| john     | changeme   |
| maria    | guess      |

## Using the Auth Guard

To protect any route, add the `@UseGuards(AuthGuard)` decorator:

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller('events')
export class EventsController {
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    // Only authenticated users can access this
    return 'This action requires authentication';
  }
}
```

## Getting Current User

Access the authenticated user in any protected route:

```typescript
@UseGuards(AuthGuard)
@Get('my-events')
getMyEvents(@Request() req) {
  const userId = req.user.sub;
  const username = req.user.username;
  // Use user data to fetch their specific events
}
```

## Next Steps

### 1. Add a Real Database
Replace the mock users in `users.service.ts` with a real database:
- **PostgreSQL + TypeORM**: `npm install @nestjs/typeorm typeorm pg`
- **MongoDB + Mongoose**: `npm install @nestjs/mongoose mongoose`
- **Prisma**: `npm install @prisma/client && npx prisma init`

### 2. Hash Passwords with bcrypt
Update the auth service to hash and compare passwords:

```typescript
import * as bcrypt from 'bcrypt';

// When creating a user:
const hashedPassword = await bcrypt.hash(password, 10);

// When validating login:
const isMatch = await bcrypt.compare(password, user.password);
```

### 3. Add User Registration
Create a signup endpoint:

```typescript
@Post('register')
async register(@Body() registerDto: { username: string; password: string }) {
  // Hash password
  const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  
  // Save user to database
  const user = await this.usersService.create({
    username: registerDto.username,
    password: hashedPassword,
  });
  
  // Return JWT token
  return this.authService.signIn(user.username, registerDto.password);
}
```

### 4. Add Input Validation
Install class-validator:

```bash
npm install class-validator class-transformer
```

Create DTOs:

```typescript
// src/auth/dto/login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

### 5. Add Refresh Tokens
Implement refresh token logic for better security and UX.

### 6. Add Role-Based Access Control (RBAC)
Create roles (admin, user, etc.) and role guards.

## Security Checklist

- [ ] Change JWT_SECRET to a strong, random value
- [ ] Use HTTPS in production
- [ ] Hash all passwords with bcrypt
- [ ] Implement rate limiting on login endpoint
- [ ] Add input validation with DTOs
- [ ] Set appropriate token expiration times
- [ ] Never expose passwords in API responses
- [ ] Implement refresh tokens
- [ ] Add account lockout after failed attempts
- [ ] Use environment variables for all secrets

## Troubleshooting

### "Unauthorized" error on protected routes
- Check that you're sending the token in the `Authorization` header
- Format: `Authorization: Bearer YOUR_TOKEN_HERE`
- Verify the token hasn't expired

### "Cannot find module" errors
- Make sure you ran `npm install`
- Check that all imports are correct

### Token doesn't verify
- Ensure JWT_SECRET is the same when signing and verifying
- Check token expiration time

## Resources

- [NestJS Authentication Docs](https://docs.nestjs.com/security/authentication)
- [JWT.io](https://jwt.io/) - Decode and inspect JWT tokens
- [Passport.js](http://www.passportjs.org/)

