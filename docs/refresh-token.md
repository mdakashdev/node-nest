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