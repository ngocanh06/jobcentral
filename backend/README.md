# JobCentral backend

REST API built with Node.js, Express, and PostgreSQL.

## Requirements

- Node.js 18 or later
- PostgreSQL

## Setup

From this directory, install dependencies and create a local environment file:

```sh
npm install
cp .env.example .env
```

Set `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, and
`POSTGRES_PASSWORD` in `.env`, then replace `JWT_SECRET`. Start the API in
development mode with `npm run dev`, or use `npm start` for a normal start.
The API listens on port `5000` by default.

`GET /api/health` checks API and PostgreSQL connectivity. Run the tests with
`npm test`.

`GET /api/jobs/categories` returns job categories from the `job_catogories`
table as JSON in the `{ "success": true, "data": [...] }` format.

## cấu trúc và hướng dẫn thư mục

- `src/routes/`: API route definitions
- `src/controllers/`: HTTP request and response handling
- `src/services/`: business logic
- `src/models/`: database access
- `src/middlewares/`: authentication, authorization, validation, and errors
- `src/validators/`: request validation rules
- `config/`: external service configuration
- `tests/`: automated API tests

Protected routes can use `authenticate` followed by `authorize('role')` from
`src/middlewares/auth.middleware.js`. Authenticated requests must send a JWT in
the `Authorization: Bearer <token>` header; the token must contain a `role`
claim for role-restricted routes.

## Run with Docker Compose

From the repository's `jobcentral` directory, set `POSTGRES_PASSWORD` in the
root `.env` file, then start the database and API:
// câu lệnh xem dữ liệu API
docker compose up --build -d

The API is available at `http://localhost:3000`; its health endpoint is
`http://localhost:3000/api/health`. Check service status and logs with
`docker compose ps` and `docker compose logs -f backend`. Stop the services
with `docker compose down`; the PostgreSQL data volume is preserved.
