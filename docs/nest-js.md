pnpm দিয়ে nest.js global install করতে command হবে:

```bash
pnpm add -g @nestjs/cli
```

nest --version


CLI = Command Line Interface. diye amra nest project create korbo.


আমরা CommonJS নিচ্ছি যাতে Jest-based testing setup দিয়ে শুরু করতে পারি।


Project তৈরি করো:

```bash
nest new neoscoder-api
```


1.1 Module কী?
Module হলো application-এর একটি নির্দিষ্ট feature বা অংশকে organize করার ব্যবস্থা।

যেমন আমাদের project-এ থাকবে:
- Auth Module
- Users Module
- Database Module
  প্রতিটি Module নিজের Controller, Service এবং প্রয়োজনীয় dependencies organize করতে পারবে।


1.2 Controller কী?
Controller-এর কাজ হলো HTTP Request গ্রহণ করা এবং Response পাঠানো।

1.3 Service কী?
Service-এর কাজ হলো Business Logic পরিচালনা করা।


---
actually route / request jokhon suru hoi : controller theke suru hoi, aar sekhane sob route thake. like


golper suru module diye, module a controller ki hobe, service ki hobe seta organize kora. 

module creat korle, auto app.module a import / register hoye jai.

endpoint request -> controller -> service 


# Step 2: Create Your First Feature Module

```bash
nest generate module health
```

amra health name akta module create korlam.


then akta health controller create korlam

```bash
nest generate controller health
```

Step 4: Create Health Service

```bash
nest generate service health
```

Step 5: Dependency Injection (DI)

এবার আমাদের Controller থেকে Service call করতে হবে। using constructor

Step 6: Understand Module Registration

then dekhbe health module a, controller and service auto register hoye geche


Step 7: Setup Global API Prefix
আমরা চাই সব API-এর শুরুতে /api থাকবে।


# Step 8: Install Validation Packages
এখন DTO এবং Validation শিখব।

DTO = Data Transfer Object.

এটি দিয়ে আমরা নির্ধারণ করি Client থেকে API-তে কী ধরনের data আসতে পারবে।

```bash
pnpm add class-validator class-transformer
```

Step 9: Enable Global Validation Pipe