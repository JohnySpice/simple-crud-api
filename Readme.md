# Simple-crud-api



Its a simple crud api for nodejs-basic course in RS-SCHOOL.

## Installation

----
Use 16 LTS version of Node.js

Install dependencies.

```bash
npm install
```

## Usage

----

Run in development mode

 ```bash
npm run start:dev
```
Run in production mode
 ```bash
npm run prod
```
Run in cluster mode
 ```bash
npm run start:multi
```

## Testing

----

Run server with commands from usage, then type
```bash
npm run test
```
### Tests have written for clear started server.

## API

----

### Endpoint `api/users`:
- **GET** `api/users` is used to get all persons
    - Server answer with `status code` **200** and all users records or empty array
- **GET** `api/users/${userId}`
    - Server answer with `status code` **200** and and record with `id === userId` if it exists
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
    - Server answer with `status code` **201** and newly created record
    - Serve answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

  Users are stored as objects that have following properties:

    * **`id`** — unique identifier (string, uuid) generated on server side
    * **`username`** — user's name (string, required)
    * **`age`** — user's age (number, required)
    * **`hobbies`** — user's hobbies (array of strings or empty array, required)
- **PUT** `api/users/{userId}` is used to update existing user
    - Server answer with` status code` **200** and updated record
    - Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/${userId}` is used to delete existing user from database
    - Server answer with `status code` **204** if the record is found and deleted
    - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist