# Splitwise MVP Backend

This project is a backend implementation of a Splitwise-like expense sharing system.

## Tech Stack
- Node.js
- Express.js
- Sequelize ORM
- SQLite

## Features
- User Registration
- User Login
- Profile Management
- Add Expenses
- Track Balances

## API Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login  

### Users
GET /api/users/profile  
PUT /api/users/profile  
DELETE /api/users/profile  

### Expenses
POST /api/expenses  
GET /api/expenses  
GET /api/expenses/activity  
PUT /api/expenses/:id  
DELETE /api/expenses/:id  

### Balances
GET /api/balances  
GET /api/balances/:otherUserId  

## Run Project

Install dependencies

npm install

Run server

node server.js

Server runs at:

http://localhost:3000

