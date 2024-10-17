Start Project- npm init or npm init -y
install express - npm i express
install nodemon- npm i -g nodemon


- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- install nodemon and update scripts inside package.ison
- What are dependencies
- What is the use of "-g" while npm install

- Difference between caret and tilde (^ vs ~ )
- initialize git
- gitignore
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extensions ex. /hello, / , hello/2, /xyz
- Order of the routes matter a lot
- Install Postman app and make a workspace/collectio › test API call
- Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman
- Explore routing and use of ?, +, (, * in the routes
- Use of regex in routes /a/ • /.*flys/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple Route Handlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route",rH,[rH2,rH3],rH4,rH5);
- What is a Middleware? Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/Login
- Error HandLing using app.use("/", (err, reg, res, next) = 0);

- Create a free cluster on MongoD official website (Mongo Atlas)
- Install mongoose Library
- Connect your application to the Database "Connection-url*/devTinder
- Call the connect function and connect to database before starting application on 7777
- Create a user-Schena & user Model
- Create POST /sigup API to add date to database
- Push some documents using API calls from postman
- Error HandLing using try , catch
- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Hake your signup API dynamic to recive data from the end user
- User.findone with duplucate email ids, which abject returned
- API- Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schematype options from the documention
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in Schema
- Add timestamps to the userSchema.
- Add API Level validation on Patch request & Signup post api
- DATA Sanitizing - Add API validation for each field
- Install validator
- Explore validator Library function and Use Vidator funcs for password,email and photoUrl,
- Never trust req.body

- validate signup data.
- Install bcrypt package.
- Create passwordHash using bcrypt.hash and save the user in encrypted password.

- Create Login API
- Compare passwords and throw errors if email or password is invalid
- install cookie-parser
- just send a dummy cookie to user
- create GET /profile APi and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create e JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of WT token and cookies to 7 days after.
- create Userschema method to getJWT().
- Create Userschema method to comparePassword,passwordInputByUser).

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routers.
- Read documentatiton for express.Router.
- Create routes folder for managing auth,profile,request routers
- Create authRouter,profileRouter,requestRouter
- Import these routers in app.js.


