খুব ভালো প্রশ্ন। একজন Backend Developer হিসেবে Refresh Token-এর শুধু code জানলেই হবে না, **কেন ব্যবহার করি, বাস্তবে কী সমস্যা সমাধান করে এবং কোথায় রাখি**—এগুলো বোঝা জরুরি।

চলো একটা Real Application-এর উদাহরণ দিয়ে বুঝি।

## **১. Refresh Token কেন ব্যবহার করব?**

ধরো, তুমি একটি Employee Management System তৈরি করেছ।

একজন Employee সকালে Login করল। এরপর সে:

- Dashboard দেখছে।
- Employee List দেখছে।
- নতুন Employee তৈরি করছে।
- Report দেখছে।

এখন প্রশ্ন হলো, তার Access Token যদি ১৫ মিনিট পর Expire হয়ে যায়, তাহলে কী হবে?

Refresh Token ছাড়া:

**Without Refresh Token**

Poor UX

1. Employee Login করল।
2. ১৫ মিনিট Application ব্যবহার করল।
3. Access Token Expire হলো।
4. প্রতিটি Protected API Unauthorized response দিতে পারে।
5. Employee-কে আবার Login করতে হবে।

এটি User Experience-এর জন্য ভালো নয়।

Refresh Token থাকলে:

**With Refresh Token**

Better UX

1. Employee একবার Login করল।
2. ১৫ মিনিট পর Access Token Expire হলো।
3. Frontend স্বয়ংক্রিয়ভাবে Refresh API call করল।
4. Backend নতুন Access Token দিল।
5. Employee কাজ চালিয়ে গেল, আবার Login করতে হলো না।

**মূল উদ্দেশ্য:** User-কে বারবার Login না করিয়ে নিরাপদভাবে দীর্ঘ সময় Authenticated রাখা।

## **২. Access Token এবং Refresh Token আলাদা কেন?**

দুটোর কাজ আলাদা।

| বিষয়     | Access Token             | Refresh Token           |
| -------- | ------------------------ | ----------------------- |
| কাজ      | API Access               | নতুন Access Token নেওয়া |
| মেয়াদ    | কম (১৫ মিনিট)            | বেশি (৭ দিন)            |
| ব্যবহার  | প্রতিটি Protected API    | Refresh Endpoint        |
| Database | সাধারণত দরকার হয় না      | Hash রাখা যায়           |
| Security | তুলনামূলক কম সময়ের ঝুঁকি | বেশি সংবেদনশীল          |

একটি বিষয় মনে রেখো:

Access Token-এর মেয়াদ কম রাখার কারণ হলো, এটি চুরি হলে আক্রমণকারী যেন বেশিক্ষণ ব্যবহার করতে না পারে।

Refresh Token বেশি শক্তভাবে সুরক্ষিত রাখতে হয়, কারণ এটি দিয়ে নতুন Access Token পাওয়া যায়।

## **৩. Refresh Token কি মনে রাখতে হবে?**

না! User-কে মনে রাখতে হবে না।

**Frontend Application Refresh Token সংরক্ষণ করবে।**

ধরো তোমার React Application আছে এবং NestJS Backend আছে।

**React Frontend**

**Access Token**

API Request-এর সময় ব্যবহার করবে।

Memory-তে রাখা যেতে পারে

**Refresh Token**

Secure, HttpOnly Cookie-তে রাখা হবে।

JavaScript সরাসরি পড়তে পারবে না

**NestJS Backend**

- Access Token Verify
- Refresh Token Verify
- Database Hash Compare
- New Token Issue

### **Real Application-এ কোথায় রাখব?**

আমরা যদি Browser-based React Application তৈরি করি, তাহলে সাধারণত:

| Token              | কোথায় রাখব?                                        |
| ------------------ | -------------------------------------------------- |
| Access Token       | In-memory (React state বা memory-based auth store) |
| Refresh Token      | HttpOnly + Secure + SameSite Cookie                |
| Refresh Token Hash | Database                                           |

কেন Refresh Token `localStorage`-এ রাখব না?

কারণ JavaScript দিয়ে localStorage পড়া যায়। কোনো XSS vulnerability থাকলে malicious script Refresh Token চুরি করতে পারে।

HttpOnly Cookie হলে JavaScript সরাসরি Cookie পড়তে পারে না। তবে Cookie-based authentication-এ CSRF protection এবং সঠিক SameSite/CORS configuration-ও গুরুত্বপূর্ণ।

## **৪. Real Application-এ পুরো Example**

ধরো তুমি সকালে Login করলে।

## **একটি বাস্তব Session**

সকাল ৯:০০

**Login**

Access Token: ১৫ মিনিট | Refresh Token: ৭ দিন

সকাল ৯:১৫

**Access Token Expired**

Frontend Refresh API call করে নতুন Access Token পাবে।

দুপুর ১:০০

**Application ব্যবহার চলছে**

প্রয়োজনে আবার Refresh করে নতুন Access Token পাবে।

৭ দিন পর

**Refresh Token Expired**

আর Refresh করা যাবে না। User-কে আবার Login করতে হবে।

এখানে একটা গুরুত্বপূর্ণ বিষয়: Refresh Token Rotation ব্যবহার করলে প্রতিবার Refresh করার সময় নতুন Refresh Token-ও দেওয়া হয়। Frontend-এর Cookie নতুন Token দিয়ে update হয় এবং Database-এ নতুন Hash save হয়।

## **৫. তোমার NestJS Project-এ আমরা কী শিখছি?**

আমাদের বর্তমান Implementation:

1. Login → Access Token + Refresh Token।
2. Refresh Token-এর Hash → PostgreSQL Database।
3. Refresh API → Refresh Token Verify।
4. bcrypt Compare → Database Hash Check।
5. New Access Token → Return।

এরপর আমরা শিখব:

- Refresh Token Rotation
- Logout এবং Token Revocation
- Expired Token Handling
- React Frontend থেকে Automatic Token Refresh
- Secure Cookie Implementation

## **তোমার জন্য একটি ছোট প্রশ্ন**

ধরো, একজন User-এর Access Token Expired হয়েছে। কিন্তু তার Refresh Token এখনো Valid।

**তখন Backend-এর কাছে কোন Token দিয়ে নতুন Access Token চাওয়া হবে?**

Access Token

Refresh Token

দুটো Token-ই

Submit Answer