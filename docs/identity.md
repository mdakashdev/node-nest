# User Identity

- api/identity/register -> `done`
- api/identity/login    -> `done`
- jwt                   -> `done`
- api/identity/me       -> `running`


1. Registration endpoint Flow: 

request (controller) -> validate (using DTO) , request file done -> service a pass kora request data -> 7 rule check kora, 


2. Login endpoint Flow: 

request (`controller`) -> validate  `(DTO)` email, password -> pass data to `service` -> 7 rules check kora then login korte deya


3. Me endpoint Flow: with Guard

controller ->

1. Frontend (GET /me + Authorization Bearer Token) -> 2. NestJS Controller (@Get('me') route match করে) ->
3. JwtAuthGuard (Token verify করে) -> 4. request.user (Verified user payload বসায়) -> 5. getMe() Controller Method (req.user.sub নেয়) ->
6. AuthService -> (getMe(userId) execute করে) -> 7. Frontend-এ Response Return


এটি NestJS-কে বলছে, এই route-এর মূল method execute করার আগে JwtAuthGuard চালাও। `(step-3)` অর্থাৎ request প্রথমে Guard-এর কাছে যাবে।



4. jwt - @nestjs/config and @nestjs/jwt

