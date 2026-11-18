```bash
pnpm exec prisma migrate dev --name add_user_is_active
```

migration file hoyeche
database migrate koreche 


migration status check - pnpm exec prisma migrate status


migration list : ls -R prisma/migrations 


```bash
pnpm exec prisma generate
```

যখন Prisma Client নতুন Schema অনুযায়ী generate বা update করতে হবে।

কিন্তু Prisma Client কীভাবে জানবে তোমার User Model-এ কোন কোন field আছে?

এটি জানে schema.prisma থেকে তৈরি হওয়া Prisma Client-এর মাধ্যমে।

যখন তুমি নতুন refreshTokenHash field যোগ করো, তখন Prisma Client-ও update করতে হবে।

Prisma Client generate না করলে পুরোনো Client-এ নতুন field সম্পর্কে TypeScript error আসতে পারে।


# Refresh token 

make secret using `openssl rand -base64 32`

ACCESS_TOKEN_SECRET="xh8b1F/wGs3ULbWUdijDHtxvUyGIsj7oE8hHw5O76QI="
ACCESS_TOKEN_EXPIRES_IN="15m"

REFRESH_TOKEN_SECRET="vlk+5QlsDY1wcezuK32wVQ9uklh0VyEb0zj2dMqZMZg="
REFRESH_TOKEN_EXPIRES_IN="7d"  

2 tar jonno alada create korbo. then 

auth/auth.module.ts a secret & expire_in set korbo from env


---

JwtService — Token generate করার জন্য।
ConfigService — Secret এবং expiration পড়ার জন্য।
PrismaService — Database update করার জন্য।
bcrypt — Refresh Token hash করার জন্য।