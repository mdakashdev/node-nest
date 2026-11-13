# User Identity

- api/identity/register -> `done`
- api/identity/login    -> `done`
- api/identity/me 


1. Registration Flow: 

request (controller) -> validate (using DTO) , request file done -> service a pass kora request data -> 7 rule check kora, 


ajke jante hobe 

> JwtModule niye jante hobe, keno import korlam

nestjs/config nad nestjs/jwt


2. Login Flow: 

request (`controller`) -> validate  `(DTO)` email, password -> pass data to `service` -> 7 rules check kora then login korte deya


3. Me Flow: with guard