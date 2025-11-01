# JWT Auth - Quick Reference Card

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install @nestjs/jwt @nestjs/passport passport passport-jwt

# 2. Start server
npm run start:dev

# 3. Test login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "changeme"}'
```

## 📌 Endpoints

| Method | Endpoint        | Auth Required | Description          |
|--------|-----------------|---------------|----------------------|
| POST   | /auth/login     | No            | Get JWT token        |
| GET    | /auth/profile   | Yes           | Get current user     |

## 🔑 Test Credentials

```
Username: john     | Password: changeme
Username: maria    | Password: guess
```

## 💡 Usage Examples

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "changeme"}'
```

### Access Protected Route
```bash
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Protect a Route in Your Code
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller('events')
export class EventsController {
  @UseGuards(AuthGuard)  // Add this decorator
  @Get()
  findAll() {
    return 'Protected!';
  }
}
```

### Get Current User
```typescript
@UseGuards(AuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;  // { sub: 1, username: 'john' }
}
```

## 📝 Response Examples

### Successful Login
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Profile Data
```json
{
  "sub": 1,
  "username": "john",
  "iat": 1700000000,
  "exp": 1700003600
}
```

### Error Response
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

## 🗂️ File Locations

```
src/auth/
├── auth.controller.ts    → Login endpoint
├── auth.service.ts       → Login logic
├── auth.guard.ts         → Protect routes
├── auth.module.ts        → JWT config
├── constants.ts          → JWT secret
└── users/
    └── users.service.ts  → User data
```

## ⚙️ Configuration

Located in `src/auth/constants.ts`:

```typescript
{
  secret: 'DO_NOT_USE_THIS_VALUE_IN_PRODUCTION',
  expiresIn: '1h'
}
```

**To change:** Create `.env` file with `JWT_SECRET=your_secret_here`

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| 401 Unauthorized | Check token in `Authorization: Bearer <token>` |
| Cannot POST /auth/login | Server not running? Use `npm run start:dev` |
| Module not found | Run `npm install` |
| Token expired | Login again to get new token |

## 📚 More Info

- **Full Setup Guide:** `AUTH_SETUP.md`
- **Testing Guide:** `TESTING_AUTH.md`
- **Implementation Summary:** `IMPLEMENTATION_SUMMARY.md`

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Test login & protected route
3. 🔜 Add real database
4. 🔜 Hash passwords with bcrypt
5. 🔜 Add user registration
6. 🔜 Add input validation (DTOs)

