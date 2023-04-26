# Fullstack App
Simple book management app. Create new books, update and delete existing books.

## How to run
1. Clone repository
2. Create .env file inside fullstacktask_backend folder.
3. Add configuration to .env file, replace [user], [password] and [host] with own database credentials. I was using a free hosted one from https://www.mongodb.com/

```
PORT = 3001
MONGODB_URI = `mongodb+srv://[user]:[password]@[host]/fullstacktask?retryWrites=true&w=majority`
TEST_MONGODB_URI = `mongodb+srv://[user]:[password]@[host]/fullstacktask_test?retryWrites=true&w=majority`
```
4. Run `npm install` inside fullstacktask_backend
5. Run `npm start`
6. Access app on http://localhost:3000/

## Features
- MongoDB database connection
- React frontend with react-bootstraps components
- Backend tests with jest and supertest, run `npm run test` inside fullstacktask_backend
- Linting with ESLINT and prettier
