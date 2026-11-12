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


Database-এর GUI interface
studio : `pnpm exec prisma studio` User table দেখতে পারবে। নতুন User তৈরি করতে, edit করতে পারবে & Record delete করতে পারবে।