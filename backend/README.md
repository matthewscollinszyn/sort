# SORT v2 Backend

PERN Stack backend with Prisma ORM for authentication and RBAC.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   
   Edit `.env` file with your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/sort_db?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   PORT=5000
   ```

3. **Setup database:**
   ```bash
   # Generate Prisma client
   npm run prisma:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed demo users
   npm run db:seed
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

## Demo Credentials

| Role     | Username | Password    |
|----------|----------|-------------|
| Student  | student  | student123  |
| Teacher  | teacher  | teacher123  |
| Admin    | admin    | admin123    |
| MRF Staff| mrf      | mrf123      |

## API Endpoints

### Authentication

- `POST /api/auth/signin` - Sign in with username/password
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/auth/users` - Get all users (admin only)

### Health Check

- `GET /api/health` - Server health status

## Tech Stack

- **Express.js** - Web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin support
