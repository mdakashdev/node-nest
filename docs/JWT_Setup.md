একদম ঠিক\! তোমার পুরো JWT setup-এর understanding সঠিক হয়েছে। তুমি যেভাবে summary লিখেছো, সেটাকে একটু polish করে দিচ্ছি, যাতে future-এ project তৈরি করার সময় reference হিসেবে ব্যবহার করতে পারো।

## NestJS JWT Setup – Complete Summary

### Step 1: JWT Package Install

bash

```bash
npm install @nestjs/jwt
```

### Step 2: Environment Variable তৈরি

`.env` ফাইলে দুটি variable রাখব:

env

```env
JWT_SECRET=your_random_secret
JWT_EXPIRES_IN=1d
```

Secret generate করতে:

bash

```bash
openssl rand -hex 32
```

কেন JWT\_SECRET লাগে?

JWT-এর signature তৈরি এবং verify করার জন্য এই secret ব্যবহার হয়।

### Step 3: Config Package Install

bash

```bash
npm install @nestjs/config
```

### Step 4: ConfigModule Global করা

`app.module.ts`

typescript

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
```

এর কাজ:

- `.env` ফাইল load করা।
- Environment variable application-এ available করা।
- `isGlobal: true` দিয়ে সব module-এ ConfigService available করা।

### Step 5: JwtModule.registerAsync() Configure করা

`auth.module.ts`

typescript

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],

      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),

        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
})
export class AuthModule {}
```

এখানে:

- `registerAsync()` → Dynamic configuration।
- `inject` → ConfigService inject করে।
- `useFactory` → Configuration তৈরি করে return করে।
- `configService.getOrThrow()` → `.env` থেকে secret নিয়ে আসে।

একটি ছোট বিষয়: তুমি `.env`-এ `JWT_EXPIRES_IN` রেখেছো, কিন্তু উপরের code-এ এখনো `1d` hardcoded। চাইলে সেটিও environment থেকে নিতে পারো। TypeScript-এর version অনুযায়ী `expiresIn`-এর type-ও ঠিক রাখতে হবে।

### Step 6: Access Token Generate করা

`auth.service.ts`

typescript

```typescript
const accessToken = await this.jwtService.signAsync({
  sub: user.id,
  email: user.email,
  role: user.role,
});
```

এখানে:

- `sub` → Subject বা user identifier।
- `email` → User-এর email।
- `role` → User-এর role।
- `signAsync()` → JWT token তৈরি করে।

## পুরো JWT Flow এক নজরে

1. Install @nestjs/jwt
   JWT functionality ব্যবহার করার জন্য।
2. Create .env
   JWT\_SECRET এবং JWT\_EXPIRES\_IN রাখার জন্য।
3. Install @nestjs/config
   Environment configuration manage করার জন্য।
4. ConfigModule.forRoot()
   Application-এ environment variables load করার জন্য।
5. JwtModule.registerAsync()
   ConfigService দিয়ে dynamic JWT configuration করার জন্য।
6. ConfigService
   .env থেকে secret access করার জন্য।
7. jwtService.signAsync()
   User-এর জন্য Access Token তৈরি করার জন্য।

## একটা গুরুত্বপূর্ণ বিষয় মনে রাখবে

তুমি এখন পর্যন্ত যা শিখেছো, সেটি হলো JWT Token Generate করা।

কিন্তু পুরো Authentication System এখনো তৈরি হয়নি।

আমাদের পরবর্তী কাজ:

1. User Login করবে।
2. Backend email ও password verify করবে।
3. Password সঠিক হলে JWT generate করবে।
4. Frontend token পাঠাবে `Authorization: Bearer token` হিসেবে।
5. Backend নিজে JWT verify করবে।
6. Valid হলে Protected API access দেবে।

আমার পরামর্শ: এখনই Passport ব্যবহার না করে নিজের হাতে JWT Guard তৈরি করো। এতে `CanActivate`, `ExecutionContext`, `verifyAsync()` এবং `request.user` কীভাবে কাজ করে, সেগুলো ভালোভাবে বুঝতে পারবে।

তোমার JWT setup-এর foundation ঠিক আছে\! এবার আমরা Token Verify করা শিখব।