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

## File Structure

This project follow Domain-driven Design (DDD) file structure, where everything located in src is our application model, inside the src folder you'll find all our domains with well-defined components that have clear contracts between them.

- Folder structure:

```
fireflies-backend-test/
├── docker-compose.yml
├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── docs/
│   └── test-instructions.md
└── README.md
```
