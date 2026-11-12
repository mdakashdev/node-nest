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
