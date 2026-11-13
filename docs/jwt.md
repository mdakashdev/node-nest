# JWT - JSON Web Token

## JWT কী? (JSON Web Token)

JWT (JSON Web Token) হলো `একটি টোকেন`, যেটা ব্যবহার করে কোনো `user login করেছে কি না`, সেটা `server যাচাই করতে পারে।`


সহজ ভাষায়:

ধরো, তুমি একটা website-এ login করলে।

1. তুমি username ও password দিলে।
2. Server তোমার তথ্য verify করল।
3. Login successful হলে server তোমাকে একটা JWT token দিল।
4. এরপর তুমি যখন অন্য কোনো private page-এ যাবে, তখন সেই token server-কে পাঠাবে।
5. Server token verify করে বুঝবে তুমি login করা user কি না।

## Simple example

ধরো, তোমার একটা website আছে:

`mywebsite.com`

তুমি login করলে server তোমাকে এই JWT দিল:

text

```text
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMywidXNlcm5hbWUiOiJqYW5pIn0.signature
```

এখন তুমি Profile page দেখতে চাও।

Frontend থেকে request যাবে:

http

```http
GET /profile
Authorization: Bearer YOUR_JWT_TOKEN
```

Backend token verify করবে।

- Token valid হলে → Profile data দেখাবে।
- Token invalid বা expired হলে → Access denied করবে।

## JWT-এর ৩টি অংশ

JWT সাধারণত ৩টি অংশ নিয়ে তৈরি:

text

```text
Header.Payload.Signature
```

1. Header: কোন algorithm ব্যবহার হয়েছে।
2. Payload: User-এর কিছু তথ্য থাকে।

json

```json
{
  "userId": 123,
  "username": "jani"
}
```

3. Signature: Token আসল কি না, সেটা verify করতে সাহায্য করে।

## Real-life example

> এক লাইনে JWT হলো login করার পর user-এর পরিচয় যাচাই করার জন্য ব্যবহৃত একটি digital token।

---

# summary -

let, ami login korar por akta jwt token pabo, sei token diye baki page gulo visit korbo, server sei toke diye amake access dibe

jwt sadharonto 3 ti bisoy niye create hoi -> Header(algorithm).Payload(payload info).Signature(jwt secret lage)

jwt akta passkey


tahole, akta token / passkey create korbo after login. 

so flow, 
user login -> backend (nestjs) -> get access token (jwt token) -> visit     protected api 


1. install @nestjs/jwt

2. jwt_secret & jwt_expires_in

env te amra 2 ta jinish rakhbo,
jwt_secret - ja amra openssl use kore generate korte pari - openssl rand -hex 32

কারণ JWT-এর signature তৈরি ও verify করার জন্য এই secret ব্যবহার হয়।

2. install @nestjs/config

3. ConfigModule - ConfigModule-কে পুরো application-এর জন্য globally available করে দেওয়া। in app.module a

`ConfigModule হলো NestJS-এর একটি module`, যা environment configuration load এবং manage করে। যেমন .env ফাইল:
এগুলো application-এ ব্যবহার করার ব্যবস্থা করে।

.env ফাইল load করা।
Environment variable application-এ available করা।
isGlobal: true দিয়ে সব module-এ ConfigService available করা।

5. JwtModule.registerAsync configure kora 

JwtModule.registerAsync()
Secret ও expiration configure করে

JwtService
Configured JWT service তৈরি হয়


signAsync(payload)
Configured secret দিয়ে token তৈরি করে


    2 ta way ache, 
    1. register (easy, secret sorasori likhe dei) 
    2. registerAsync (dynamic configure, কিন্তু আমরা চাই secret .env থেকে আসুক।), 
    3. registerAsync() + ConfigService (eita real world a use hoi)

Real-world project-এ সাধারণত .env থেকে secret নেওয়ার জন্য এই পদ্ধতি ব্যবহার করা হয়। 3 no. ta use kora hoi.

useFacory kora mane, 
JWT তৈরি করার সময় কোন secret ব্যবহার করবে।
JWT-এর default expiration কত হবে।
NestJS এই configuration অনুযায়ী JwtService তৈরি করে।


this.jwtService.signAsync(payload);

এখানে কিন্তু secret দাওনি!
তাহলে secret কোথা থেকে পেল?
উত্তর: JwtModule.registerAsync()-এ আগে যে secret configure করেছিলে, `JwtService সেটি সেখান থেকেই automatically ব্যবহার করছে।`
একইভাবে expiresIn-ও automatically ব্যবহার করছে।

NestJS নিজে থেকেই JwtService তৈরি করে দেয়। তোমাকে manually new JwtService() লিখে তৈরি করতে হয় না।

6. ConfigService

ConfigService হলো একটি service, `যার মাধ্যমে আমরা environment variable-এর value access করতে পারি।`

7. access token create

signAsync() → Secret দিয়ে JWT তৈরি করবে।

verifyAsync() → একই Secret দিয়ে JWT verify করবে।
মনে রাখবে: একবার JwtModule configure করলে প্রতিবার signAsync() বা verifyAsync() করার সময় secret আলাদাভাবে দিতে হয় না।



summary :   
install @nestjs/jwt 
    then 
put secret in env 
    then 
env full application a load korar jonno ConfigModule a global true kora 
    then  
particulat module JwtModule.registerAsync er ConfigService maddhome dynamic vabe useFactory er madhome use korlam 
    then 
access token create korlam
const accessToken = await this.jwtService.signAsync({
sub: user.id,
email: user.email,
role: user.role,
});


npm install @nestjs/passport passport passport-jwt


একটা গুরুত্বপূর্ণ কথা: JWT-এর Payload Base64URL encoded থাকে, encrypted নয়। তাই password বা sensitive data কখনো Payload-এ রাখবে না।
এখন মনে রাখবে:
তুমি Payload দাও → JwtService Header + Payload + Signature তৈরি করে → তোমাকে Complete JWT Token দেয়।




Flow : .env File -> ConfigModule (Configuration load করে) -> ConfigService (Configuration-এর value access করে)
---







---


তোমার এই কোডে `JwtModule`-এর actual কাজ হলো তোমার NestJS application-এ JWT তৈরি (Generate) এবং Verify করার সুবিধা দেওয়া।

সহজভাবে ধাপে ধাপে বুঝি।

### ১. JwtModule কী করছে?

typescript

```typescript
JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    secret: configService.getOrThrow<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: '15m',
    },
  }),
})
```

এখানে তুমি NestJS-কে বলছো:

"আমার application-এ JWT ব্যবহার করতে চাই। JWT তৈরি এবং verify করার জন্য এই configuration ব্যবহার করো।"

### ২. Configuration দিয়ে কী হচ্ছে?

- `secret`: JWT Token sign এবং verify করার জন্য secret key দিচ্ছো।
- `expiresIn: '15m'`: তৈরি করা JWT Token ১৫ মিনিট পর expire হবে।

### ৩. এরপর এই JwtModule কোথায় কাজে লাগবে?

তোমার `IdentityService`-এ `JwtService` inject করে ব্যবহার করতে পারবে।

উদাহরণ:

typescript

```typescript
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IdentityService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async generateToken(userId: number) {
    return this.jwtService.sign({
      sub: userId,
    });
  }
}
```

এখানে:

- `jwtService.sign()` → JWT Token তৈরি করবে।
- `jwtService.verify()` → JWT Token সঠিক কি না যাচাই করবে।
- `jwtService.decode()` → Token-এর payload পড়বে, কিন্তু validity যাচাই করবে না।

### পুরো বিষয়টা এক লাইনে

JwtModule তোমার application-এ JWT functionality setup করে দেয়, আর JwtService ব্যবহার করে তুমি সেই functionality কাজে লাগাও।

অর্থাৎ:

`JwtModule` = JWT configure করা।

`JwtService` = JWT নিয়ে কাজ করা।