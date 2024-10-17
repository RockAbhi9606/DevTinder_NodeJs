#dev tinder Api

##authRouter
- POST /signup
- GET /login 
- POST /logout

##profileRouter
- GET /profile/view 
- PATCH /Profile/edit
- PATCH /profile/password

##connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignore/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

##userRouter
- GET /user/connections
- GET /user/requests/
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore,intrested,accepted,rejected