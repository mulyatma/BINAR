# BINAR CHALLENGE 4

THIS CHALLENGE IS MAKING RESTFUL API FOR CAR DATA MANAGEMENT WITH DATABASE USING EXPRESS.JS, SEQUELIZE, AND POSTGRES AS DBMS

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
   - install Sequlize-cli `npm install --save-dev sequelize-cli`
   - configure the config.json file in `config/config.json`

# END POINTS

- Get message ping `http://localhost:3000/`
- Get list cars `http://localhost:3000/cars`
- Get car by id `http://localhost:3000/cars/:id`
- Post new car `http://localhost:3000/cars`
- Put car by id `http://localhost:3000/cars/:id`
- Delete car by id `http://localhost:3000/cars/:id`

Post new car and put car by id using request body type JSON, example:
`{
  "image": "(path)",
  "rentPerDay": 200000, (integer)
  "capacity": 2, (integer)
  "description": "(create or update descripton)",
  "availableAt": "2022-03-23T15:49:05.563Z",
}`
