# Roadmap

1. Phase 1 — Environment & Project Setup
             Node.js, NestJS CLI, Project creation, folder structure।

2. Phase 2 — NestJS Fundamentals
             Module, Controller, Service, Dependency Injection, DTO, Pipes।

3. Phase 3 — Database Integration
             PostgreSQL, Prisma, User Model, Migration।

4. Phase 4 — Authentication ------------ `running`
             Register, Login, bcrypt, JWT, Refresh Token।

5. Phase 5 — Authorization
             Guards, Roles, Admin permission।

6. Phase 6 — User Management APIs
             Profile, Get All Users, Update User।

7. Phase 7 — Production Features
             Swagger, Exception Handling, Logging, Interceptors।

8. Phase 8 — Testing & Deployment
             Jest, Docker, Environment Variables, GitHub।



# Technology Stack

| Technology | ব্যবহার                 |
|------------|-------------------------|
| Node.js    | JavaScript runtime      |
| NestJS     | Backend framework       |
| TypeScript | Programming language    |
| PostgreSQL | Database                |
| Prisma     | ORM                     |
| JWT        | Authentication          |
| Passport   | Authentication strategy |
| bcrypt     | Password hashing        |
| Swagger    | API documentation       |
| Jest       | Testing                 |
| Docker     | Containerization        |

# API Endpoint

| # | Method | Endpoint         | কাজ                       |
|---|--------|------------------|---------------------------|
| 1 | POST   | `/auth/register` | User registration         |
| 2 | POST   | `/auth/login`    | User login                |
| 3 | GET    | `/users/profile` | নিজের Profile দেখা        |
| 4 | GET    | `/users`         | Admin সব User দেখতে পারবে |
| 5 | PATCH  | `/users/:id`     | User update               |

এগুলোর পাশাপাশি Refresh Token, Role-based Authorization এবং Input Validation implement করব।
