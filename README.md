## Snippet
We will continue our work on the backend.
- We will be writing unit and integration tests for the backend
- We will take a look at implementing user authentication and authorization

## Notes
### 1. Setup 
```
$ npm init -y
```

### 2. Install minimum dependencies
```
$ npm install bcrypt cors cross-env dotenv express jsonwebtoken lodash mongoose morgan nodemon save-dev
$ npm install --save-dev jest supertest eslint
```

### 3. Create `.env` file
```
MONGODB_URI=your_uri
TEST_MONGODB_URI=your_uri
PORT=your_port
SECRET=your_string
```

