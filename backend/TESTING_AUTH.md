# Testing Your JWT Authentication

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/delinschiivlad/Documents/TCC/Eventure/backend
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
```

Note: We're using the basic implementation without bcrypt for now (you can add it later).

### 2. Start the Server

```bash
npm run start:dev
```

The server should start on `http://localhost:3000`

### 3. Test the Login Endpoint

#### Using curl:

```bash
# Login with username "john" and password "changeme"
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "changeme"}'
```

**Expected Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiam9obiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAzNjAwfQ.signature"
}
```

#### Using Postman or Thunder Client:

**POST** `http://localhost:3000/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "username": "john",
  "password": "changeme"
}
```

### 4. Test the Protected Route

Copy the `access_token` from the login response, then:

#### Using curl:

```bash
curl http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "sub": 1,
  "username": "john",
  "iat": 1700000000,
  "exp": 1700003600
}
```

#### Using Postman or Thunder Client:

**GET** `http://localhost:3000/auth/profile`

**Headers:**
```
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

### 5. Test Authentication Failure

#### Try accessing profile without token:

```bash
curl http://localhost:3000/auth/profile
```

**Expected Response:** `401 Unauthorized`

#### Try with wrong credentials:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "john", "password": "wrongpassword"}'
```

**Expected Response:** `401 Unauthorized`

## Test Scenarios Checklist

- [ ] ✅ Login with valid credentials returns a JWT token
- [ ] ✅ Login with invalid username returns 401
- [ ] ✅ Login with invalid password returns 401
- [ ] ✅ Protected route works with valid token
- [ ] ✅ Protected route returns 401 without token
- [ ] ✅ Protected route returns 401 with invalid token
- [ ] ✅ Protected route returns 401 with expired token (wait 1 hour or change expiresIn to 10s for testing)

## Available Test Users

| Username | Password   | User ID |
|----------|------------|---------|
| john     | changeme   | 1       |
| maria    | guess      | 2       |

## Common Issues

### Issue: "Cannot POST /auth/login"
**Solution:** Make sure the server is running and you're using POST method.

### Issue: "Unauthorized" on protected route
**Solution:** 
- Check that you're including the `Authorization` header
- Verify the format is: `Bearer YOUR_TOKEN` (with space after Bearer)
- Make sure token hasn't expired

### Issue: Server won't start
**Solution:**
- Run `npm install` to ensure all dependencies are installed
- Check if port 3000 is already in use

### Issue: Module not found errors
**Solution:**
- Install the JWT packages: `npm install @nestjs/jwt @nestjs/passport passport passport-jwt`

## Next Steps After Testing

Once everything works:

1. **Add bcrypt for password hashing:**
   ```bash
   npm install bcrypt
   npm install -D @types/bcrypt
   ```

2. **Create a real database** (PostgreSQL, MongoDB, etc.)

3. **Add user registration endpoint**

4. **Implement refresh tokens**

5. **Add input validation with DTOs**

6. **Set up proper environment variables**

## Visual Studio Code REST Client

If you use VS Code, create a file `test-auth.http`:

```http
### Login
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "changeme"
}

### Get Profile (replace with your token)
GET http://localhost:3000/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### Login with wrong password
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "john",
  "password": "wrongpassword"
}
```

Install the "REST Client" extension in VS Code to use this file.

