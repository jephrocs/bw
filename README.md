# Simple Developer Exercise 

This application was made using Node, React, express and low DB
Authentication is handled by jwt and passport

To start with the server type in the terminal:
npm run dev

To start react (front end):
cd view/bw
npm start

## Details

Each user route is protected via JWT. You must have a token in order to update or get data from a user. Password implements password hashing.  

## API
Routes:
POST
localhost:7070/login
Test body:
{
        "email":"willsmith@will.com",
        "password": "123"
}
GET
localhost:7070/users/:id
Headers{
  Authorization: Bearer '$token'
}

PUT
localhost:7070/users/:id
Headers{
  Authorization: Bearer '$token'
}

GET
localhost:7070/logout

POST
localhost:7070/signup

## Database Structure

Below is an example of user login inside the database.
```
{
  "_id": "5410953eb0e0c0ae25608277",
  "guid": "eab0324c-75ef-49a1-9c49-be2d68f50b96",
  "isActive": true,
  "balance": "$3,585.69",
  "picture": "http://placehold.it/32x32",
  "age": 30,
  "eyeColor": "blue",
  "name": {
	"first": "Henderson",
	"last": "Briggs"
  },
  "company": "GEEKNET",
  "email": "henderson.briggs@geeknet.net",
  "salt": "23derd*334", // Bonus for salt password hashing
  "password": "9e4d16b6e67aa3a9b2fbb6a488bf32fb53bc34a7", // Bonus for salt password hashing
  "phone": "+1 (936) 451-3590",
  "address": "121 National Drive, Cotopaxi, Michigan, 8240"
}
```
## Requirements

* Create a sign up page to allow user to register new login
* Login to the app via email and password
* Restrict access to valid a User
* Once logged in show the details of the user on the page
* Authorized users can check their account balance
* Allow the user to change their details
* lowdb (DB) -> https://github.com/typicode/lowdb
* node.js -> http://nodejs.org/ 

## Bonus Points

* Implememnt password hashing (eg. append a salt onto the password before hash with SHA1)
* Fully responsive UI
* Unit Tests of the API
* Functional Tests of the UI
