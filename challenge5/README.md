# BINAR CHALLENGE 4

THIS CHALLENGE IS MAKING RESTFUL API FOR CAR DATA MANAGEMENT WITH DATABASE USING EXPRESS.JS, SEQUELIZE, AND POSTGRES AS DBMS, bcrypt for encrypt password, jsonwebtoken to make token.

# INSTRUCTION

1. Clone this repo
2. Install Nodejs, Express.js, Sequelize
   - install NPM `$ npm init -y`
   - install Express.js `$ npm install express`
   - install Sequlize `$ npm install --save sequelize`
     You'll also have to manually install the driver for your database of choice:
     - `$ npm install --save pg pg-hstore` # Postgres
     - `$ npm install --save mysql2`
     - `$ npm install --save mariadb`
     - `$ npm install --save sqlite3`
     - `$ npm install --save tedious` # Microsoft SQL Server
     - `$ npm install --save oracledb` # Oracle Database
   - install Sequlize-cli `$ npm install --save-dev sequelize-cli`
   - configure the config.json file in `config/config.json`
3. Creat database if not exists
   `sequelize db:create`
4. Runing migration
   `sequelize db:migrate`
5. Runing seeds
   `sequelize db:seed:all`
6. Running app
   `npm run start`

# ENTITY RELATIONSHIP DIAGRAM

![image](https://github.com/mulyatma/BINAR/assets/100142273/66e61b10-11ff-4700-acf6-f2706efaf8c0)

# END POINTS

- Get message ping `http://localhost:3000/`
- Get list cars `http://localhost:3000/cars`
- Get car by id `http://localhost:3000/cars/:id`
- Post new car `http://localhost:3000/cars`
- Put car by id `http://localhost:3000/cars/:id`
- Delete car by id `http://localhost:3000/cars/:id`
- Post Register admin `http://localhost:3000/admin/register`
- Post register member `http://localhost:3000/register`
- Post login `http://localhost:3000/login`
- Get current user `http://localhost:3000/current/user`

# SUPER ADMIN EMAIL AND PASSWORD

Email : superadmin@gmail.com
Password : superadmin123

# EXAMPLE

Post new car and put car by id using request body type JSON, example:
`{
  "image": "(path)",
  "rentPerDay": 200000, (integer)
  "capacity": 2, (integer)
  "description": "(create or update descripton)",
  "availableAt": "2022-03-23T15:49:05.563Z",
}`

Post new user as admin or member using request body type JSON, example:
`{
   "name": "admin1",
   "email": "admin1@gmail.com",
   "password": "admin123"
   "role": "admin" (if register as admin)
}`
