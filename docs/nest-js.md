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

# Step 2: Create Your First Feature Module