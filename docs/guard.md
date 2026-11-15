এটি চেক করে কোনো user,  `valid JWT token নিয়ে` API access করতে এসেছে কি না।


CanActivate: `Guard তৈরি করার জন্য ব্যবহার হয়।`
ExecutionContext: `কোন request আসছে, সেটা access করতে সাহায্য করে।`

Injectable: `Class-টিকে NestJS-এর Dependency Injection`-এর জন্য প্রস্তুত করে।

UnauthorizedException: Authentication fail করলে 401 error দেয়।

JwtService: `JWT token verify করার কাজ করে।`

---

```ts
export interface JwtPayload {
sub: string;
email: string;
role: string;
}
```
এটি বলে দেয় JWT token-এর ভিতরে কী কী data থাকবে।

---

# Guard create 

1. http requst ta pick / recieve kora
2. header theke token nicche
3. token & bearer na thakle error dicche
4. token ta alada korche
5. token verify korche and token a thaka user info payload a rekhe dicche then reurnt
6. na hole invalid return korche
   

### JwtAuthGuard-এর কাজ

1. HTTP Request Receive: `ExecutionContext` ব্যবহার করে incoming HTTP request receive করছে।

2. Header থেকে Token নেওয়া: Request-এর `Authorization` header থেকে token নিচ্ছে।

3. Token Check: Authorization header না থাকলে অথবা `Bearer ` না থাকলে `Token is required` error দিচ্ছে।

4. Token আলাদা করা: `substring(7)` দিয়ে `Bearer ` বাদ দিয়ে শুধু JWT token নিচ্ছে।

5. Token Verify: `verifyAsync()` দিয়ে token valid কি না check করছে। Valid হলে token-এর ভিতরের user information `payload`-এ রাখছে এবং `request.user = payload` করছে। এরপর `return true` দিচ্ছে।

6. Invalid Token: Token invalid বা expired হলে `catch` block execute হচ্ছে এবং `Invalid or expired token` error দিচ্ছে।

### একটা বিষয় মনে রাখবে

`payload` এবং `request.user` এক জিনিস নয়।

- `payload` = JWT token থেকে পাওয়া user information।
- `request.user` = পরবর্তী Controller-এ ব্যবহারের জন্য সেই information request-এর মধ্যে রাখা।

তোমার বোঝাটা সঠিক। এই ৬টি ধাপ বুঝতে পারলে JWT Auth Guard কীভাবে কাজ করে, সেটা পরিষ্কার হয়ে যাবে।