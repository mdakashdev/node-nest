Prisma হলো একটি ORM (Object Relational Mapper)।

এটি আমাদের TypeScript code এবং Database-এর মধ্যে যোগাযোগ সহজ করে।


Laravel	NestJS
Eloquent ORM	Prisma ORM
Migration	Prisma Migration
Model	Prisma Schema Model
User::all()	prisma.user.findMany()
User::create()	prisma.user.create()


# postgres 

run korar jonno 


```bash
psql --version

brew services list

brew services start postgresql@18

psql postgres
```

PostgreSQL terminal-এ নিচের SQL চালাও:

```sql
CREATE USER neos_user WITH PASSWORD 'neos_password123';
CREATE DATABASE neoscoder_db OWNER neos_user;
```

Database তৈরি হয়েছে কিনা দেখতে:
\l

PostgreSQL terminal থেকে বের হতে:

\q

Prisma CLI & client install:

```bash
pnpm add -D prisma@6.19.0
pnpm add @prisma/client@6.19.0
```

এখানে:
- prisma = CLI, Schema, Migration পরিচালনা করবে।
- @prisma/client = NestJS code থেকে Database query করবে।