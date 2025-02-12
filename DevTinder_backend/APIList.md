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

<!-- - POST /request/send/intrested/:userId
- POST /request/send/ignore/:userId -->

- POST /request/send/:status/:userId

<!-- - POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId -->

- POST /request/review/:status/:requestId

##userRouter

- GET /user/connections
- GET /user/requests/
- GET /user/feed - Gets you the profiles of other users on platform

Status: ignore,intrested,accepted,rejected

- Signup on AWS
- Launch instance
- chmod 400 <secret>.pem
- ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
- Install Node version 16.17.0
- Git clone
- Frontend
  - npm install -> dependencies install
  - npm run build
  - sudo apt update
  - sudo apt install nginx
  - sudo systemctl start nginx
  - sudo systemctl enable nginx
  - Copy code from dist(build files) to /var/www/html/
  - sudo scp -r dist/\* /var/www/html/
  - Enable port :80 of your instance
- Backend
  - updated DB password
  - allowed ec2 instance public IP on mongodb server
  - npm intsall pm2 -g
  - pm2 start npm --name "devTinder-backend" -- start
  - pm2 logs
  - pm2 list, pm2 flush <name> , pm2 stop <name>, pm2 delete <name>
  - config nginx - /etc/nginx/sites-available/default
  - restart nginx - sudo systemctl restart nginx
  - Modify the BASEURL in frontend project to "/api"
