Step 5: Initialize Prisma
এখন চালাও:
pnpm exec prisma init


এতে দুটি গুরুত্বপূর্ণ জিনিস তৈরি হবে:
neoscoder-api/
│
├── prisma/
│   └── schema.prisma
│
├── .env
└── src/


schema.prisma হলো আমাদের Database Model লেখার জায়গা।

.env হলো Database connection information রাখার জায়গা।


Step 7: Create User Model
এখন আমাদের Database Table design করব।

prisma/schema.prisma ওপেন করো।


Step 8: Create Database Migration
এখন আমাদের Prisma Schema থেকে PostgreSQL Table তৈরি করতে হবে।

Terminal:
pnpm exec prisma migrate dev --name init


এখানে কী হবে?
1. Prisma Database connection করবে।
2. Schema এবং Database compare করবে।
3. SQL Migration file তৈরি করবে।
4. PostgreSQL-এ User table তৈরি করবে।
5. Prisma Client update করবে।




Step 1: PostgreSQL-এ প্রবেশ করো
Terminal-এ চালাও:
psql postgres


সফল হলে এমন prompt আসবে:
postgres=#





তারপর PostgreSQL থেকে বের হও:
\q


Step 4: Migration আবার চালাও
তোমার project directory-তে:
pnpm exec prisma migrate dev --name init


সফল হলে এমন output আশা করতে পারো:



---

* PrismaClient হলো Database query করার মূল Client।
* extends PrismaClient দিয়ে Prisma-এর সব database methods পাচ্ছি।
* OnModuleInit Application start হলে Database connection তৈরি করে।
* OnModuleDestroy Application বন্ধ হলে connection বন্ধ করে।

# Step 11: Configure Prisma Module
- providers — PrismaService register করছে।
- exports — অন্য Module-কে PrismaService ব্যবহার করতে দিচ্ছে।
- @Global() — Root Module-এ import করার পর অন্য Module থেকেও ব্যবহার করতে পারব।


# Step 12: Configure AppModule

এখন .env থেকে runtime-এ Database URL load করার জন্য NestJS ConfigModule ব্যবহার করব।

```bash
pnpm add @nestjs/config
```

এখন NestJS .env থেকে DATABASE_URL load করবে এবং PrismaService সেটি ব্যবহার করতে পারবে।



# Step 13: Connect HealthService with Database