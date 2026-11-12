# Summary

Target: i want to db integration, insert, retrieve, update data using database.

> NestJS থেকে Database-এ Data Save, Read, Update এবং Delete করতে হয়।

Need to work / setup: 
1. Database create 
2. Database connect (Globally)
3. Model create (schema.prisma te model likhi)
4. Table create (using migration)
5. Data retrieve (using api)


Tech:
PostgreSQL (database)
Prisma ORM (Database-এর সঙ্গে যোগাযোগ)
Prisma Client
NestJS (backend API)
TypeScript (Type-safe code)


Basic: 
prisma : prisma holo akta object relational mapper (ORM) as like laravel Eloquent ORM

amra database kichu insert or retrieve korte hole amra SQL use kore korte pari - like 

select * from users;
INSERT INTO users (name, email) VALUES ('Akash', 'akash@example.com'); 

but amra cai, nestJS theke SQL na likhe data save / retrieve korte cai. aar ta somvob `PRISMA` diye, object relational mapper (ORM)
PRISMA TypeScript code and database er sathe jogajog korte help kore.

we will use `Prisma 6.19` bec. `Prisma 7` need more setup like - driver adapter & client generation configuration


Sei jonno amader ja korte hobe :

## PostgreSQL

install & setup : PostgreSQL 
    check :  `psql --veriosn` jodi na thake install
    install : `brew install postgresql@18`
    
database create :
    connect : `psql postgres` terminal theke conncent for database create, TablePlus diye o connect kora jai.
    user crate : `CREATE USER neos_user WITH PASSWORD 'neos_password123';` need permission to create database for this user
    permission : `ALTER USER neos_user CREATEDB;`
    permission verify : `\du`
    db create : `CREATE DATABASE neoscoder_db OWNER neos_user;`
    db check : `\l`
    quite terminal :  `\q`
    
## Prisma

install & setup : prisma 
    CLI install : `pnpm add -D prisma@6.19.0` CLI, schema, migration er kaj korbe
    Client install : `pnpm add @prisma/client@6.19.0` NestJS code theke database query korbe.
    prisma initialize : `pnpm exec prisma init` then we get - prisma/schema.prisma (`model likhar jaiga`) & .env (`db connect er information rakhar jaiga`)

config db connection: .env
    DATABASE_URL="postgresql://neos_user:neos_password123@localhost:5432/neoscoder_db?schema=public"


create model : user
    prisma/schema.prisma ei file model ta likhbo.


migrate create : Prisma Schema থেকে PostgreSQL Table তৈরি করতে হবে। 
    migration : `pnpm exec prisma migrate dev --name init` ; 
                 sql migration file create hobe, db te user table create hobe and client update hobe; we get prisma/migration
    check migration : `pnpm exec prisma migrate status`


Generate Prisma Client :  PrismaClient হলো Database query করার মূল Client
    generate : `pnpm exec prisma generate` eita korle amra code likhte parbo - prisma.user.findMany(); prisma.user.create(); prisma.user.update(); etc


prisma integrate with NestJS : 
    sei jonno amra akta feature / module create korbo.
    module : `nest g module prisma`
    service : `nest g service prisma`

service create : prisma service for datbase connection hobe jokhon applicaiton start hobe and close hobe jokhob applicaiton bondho hobe
    extends : PrismaClient দিয়ে Prisma-এর সব database methods পাচ্ছি।
    OnModuleInit : Application start হলে Database connection তৈরি করে।
    OnModuleDestroy:  Application বন্ধ হলে connection বন্ধ করে।


configure prisma Module :  feature module a config korbo
    providers : PrismaService register করছে।
    exports : অন্য Module-কে PrismaService ব্যবহার করতে দিচ্ছে। caile onno module ei service use korte parbe
    @Global() : Root Module-এ import করার পর অন্য Module থেকেও ব্যবহার করতে পারব।


Configure AppModule: root module a , এখন .env থেকে runtime-এ Database URL load করার জন্য NestJS ConfigModule ব্যবহার করব।
    install : `pnpm add @nestjs/config` then module a import kore dibo, aar isGlobal true kore dibo
                এখন NestJS .env থেকে DATABASE_URL load করবে 
                এবং PrismaService সেটি ব্যবহার করতে পারবে।
    

## Connect DB with feature / module

    - Connect HealthService with Database
    - prisma ke inject korbo, dependency injeciton using construction 
    - akta service create korbo, ja diye database er akta table check korbo (test purpose)
    - then controller theke api endpoint call korbo like - /api/database


---

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
Prisma CLI & client install:

```bash
pnpm add -D prisma@6.19.0
pnpm add @prisma/client@6.19.0
```

এখানে:
- prisma = CLI, Schema, Migration পরিচালনা করবে।
- @prisma/client = NestJS code থেকে Database query করবে।