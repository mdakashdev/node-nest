Endpoint : 

নতুন User তৈরি
    POST	/api/auth/register
Login করে JWT Token পাওয়া
    POST	/api/auth/login
Login করা User-এর তথ্য পাওয়া
    GET	/api/auth/me	

এই Phase-এ শিখবে:
1. Password hashing — bcryptjs
2. JWT — JSON Web Token
3. Authentication Module, Controller ও Service
4. DTO validation
5. JWT Guard
6. Protected API

---

> Laravel-এ যেমন registration, login এবং authentication middleware থাকে, 

> NestJS-এ আমরা Service, JWT এবং Guard দিয়ে একই কাজ করব।


install: bcryptjs and @nestjs/jwt

```bash
pnpm add @nestjs/jwt bcryptjs
```

1. create auth module
    module, controller and service 
    then auth module auto register hobe app.module a
2. create dto file for auth
    create register and login dto file.
3. create jwt secret
    `openssl rand -hex 32`  : random secret তৈরি করবে
    then secret ta env te rakhbo 
4. dto file ready, registration a thakbe - name, email, password & login a thakbe - email & password (eita ami AI er help niye kore felbo)
5. jwt configuration 
    auth module a korte hobe,
6. create jwt guard 

Client Request
|
v
Authorization Header
|
v
JWT Guard
|
v
Token Valid?
/     \
Yes      No
|        |
v        v
Controller  401 Unauthorized


Next a guard, dto and service and jwt-auth, arekbar dekte hobe.

centralize error handle and response structure dekte hobe.



/register endpoint er jonno 

auth controller post register korlam 


Data Transfer Object - dto validation er jonno - ei docs theke dekhe korbo >  https://github.com/typestack/class-validator#validation-decorators

একটা বিষয় মনে রাখবে: DTO নিজে থেকে validation বা security নিশ্চিত করে না। NestJS-এ `class-validator এবং ValidationPipe` ব্যবহার করে এই কাজগুলো কার্যকর করতে হয়।

শুধু RegisterDto লিখলেই validation automatically কাজ করবে না। NestJS-এ ValidationPipe enable করতে হবে।

ei jonno - `class-validator` package install kora hoyeche.


prisma queery -> https://www.prisma.io/docs/orm/v7/reference/prisma-client-reference#model-queries


এটি NestJS-এর একটি Decorator, যা কোনো Class-কে NestJS-এর Dependency Injection (DI) System-এর মাধ্যমে ব্যবহার করার উপযোগী করে।
এটি NestJS-কে জানায় যে AuthService একটি Injectable Provider।

@Injectable() দেওয়ার কারণে AuthService-কে NestJS-এর Dependency Injection (DI) System-এর মাধ্যমে অন্য জায়গায় ব্যবহার করতে পারবে।


sob mojar document gulo - https://docs.nestjs.com/exception-filters eikhane ache, akta kore porlei hobe. like `ConflictException`

password hassing er jonno - `bcryptjs` package use korechi.

jw service er jonno - `@nestjs/jwt` ei package use korechi 


এই লাইনটি খুব গুরুত্বপূর্ণ। এটি JavaScript-এর Object Destructuring + Rest Operator ব্যবহার করেছে।
এর কাজ হলো user object থেকে password আলাদা করে বাকি সব property safeUser-এর মধ্যে রাখা।





FLow: 
request -> controller -> request file with validation -> service -> JwtService -> prisma service -> guard 

1. user ache kina seita check kora
2. jodi thake tahole error deya
3. password hash kora
4. user create kora
5. token create kora
6. passord ke response theke alada kora
7. return kora

01. Check Existing User
    Email আগে থেকেই আছে কিনা
02. Throw Exception
    User থাকলে Error
03. Hash Password
    Password নিরাপদভাবে Hash
04. Create User
    Database-এ User Save
05. Generate Token
    JWT Access Token তৈরি
06. Exclude Password
    Response থেকে Password বাদ
07. Return Response
    Client-কে Data পাঠানো

User Check: Database-এ আগে থেকেই এই Email দিয়ে কোনো User আছে কিনা চেক করা।
Error Throw: User থাকলে ConflictException দিয়ে error পাঠানো।
Password Hash: User-এর Password-কে bcrypt.hash() দিয়ে hash করা।
User Create: Prisma-এর মাধ্যমে Database-এ নতুন User তৈরি করা।
Token Generate: jwtService.signAsync() দিয়ে JWT Access Token তৈরি করা।
Password Exclude: password property-কে আলাদা করে বাকি User Data safeUser-এ রাখা, যাতে Response-এ Password না যায়।
Return Response: Success message, User Information এবং Access Token Client-কে পাঠানো।