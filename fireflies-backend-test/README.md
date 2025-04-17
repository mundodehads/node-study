# Fireflies backend test

## How to run this project

### Requirements

- Docker with compose;
- node v18+.

### Commands

- To set the container up run the following docker compose command to build the application:

```
docker-compose up --build
```

- To verify the setup, make sure that in another terminal you run the seed script to populate the database with initial data:

```
npm run seed
```

- To check the lifecycle of a meeting run the e2e tests with:

```
npm test
```

## File Structure

This project follow Domain-driven Design (DDD) file structure, where everything located in src is our application model, inside the src folder you'll find all our domains with well-defined components that have clear contracts between them.

- Folder structure:

```
fireflies-backend-test/
├── docker-compose.yml          # Docker Compose configuration
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
├── src/                        # Application source code
│   ├── Dockerfile              # Dockerfile for the application
│   ├── server.ts               # Main application entry point
│   ├── meetings/               # Meetings domain
│   │   ├── meetings.controller.ts
│   │   ├── meetings.service.ts
│   │   ├── dto/                # Data Transfer Objects
│   ├── dashboard/              # Dashboard domain
│   │   ├── dashboard.controller.ts
│   │   ├── dashboard.service.ts
│   ├── middlewares/            # Express middlewares
│   ├── models/                 # Interfaces used in each domain
│   ├── database/
│   │   ├── entities            # Database entities
├── test/                       # End-to-end tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.config.js
├── database/                   # Database source code
│   ├── Dockerfile              # Dockerfile for the database config
│   ├── seed.ts                 # Seed script to populate the database
```
