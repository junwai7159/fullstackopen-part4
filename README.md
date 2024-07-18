## Snippet
We will continue our work on the backend.
- We will be writing **unit and integration tests** for the backend
- We will take a look at implementing **user authentication and authorization**

## Procedure
### 1. Setup 
```
$ npm init -y
```

### 2. Install minimum dependencies
```
$ npm install bcrypt cors cross-env dotenv express jsonwebtoken lodash mongoose morgan save-dev
```

### 3. Install dev dependencies for server watching and automated testing
```
$ npm install --save-dev jest supertest eslint nodemon
```

### 3. Create `.env` file
```
MONGODB_URI=your_uri
TEST_MONGODB_URI=your_uri
PORT=your_port
SECRET=your_string
```

### 4. Create `index.js` file

### 5. Create `app.js` file

### 6. Add npm run scripts to `package.json` file （for future use）
```
"scripts": {
  "start": "cross-env NODE_ENV=production node index.js",
  "dev": "cross-env NODE_ENV=development nodemon index.js",
  "test": "cross-env NODE_ENV=test node --test",
  "build:ui": "@powershell Remove-Item -Recurse -Force dist && cd ../frontend && npm run build && @powershell Copy-Item dist -Recurse ../backend",
  "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push",
  "lint": "eslint ."
}
```

### 7. Run the project
```
$ npm start
```

## Sidenote
Morgan instead of requestLogger, edit `app.js`
```
const morgan = require('morgan')

```