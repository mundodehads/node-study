# Prosigliere Test

## Description

This test contains a coding challenge by the company Prosigliere, where I was requested with designing and implementing a RESTful API for managing a simple blogging
platform.

The core functionality of this platform includes managing blog posts and their associated comments.

To solve this test I have used Nest.js to create a post-service to handle all posts associated business logic as its own microservice, to help with local testing and to have an actual production ready environement I have use docker (to have a dockerfile to deploy) with compose (for local only).

## Project setup

- System requirements:
- node.js v18+
- Docker desktop
- Postman

- Open a command line and run the following commands:

```bash
$ npm install
```

This command will install all external dependencies required to prepare our local environment.

## Compile and run the project

To run this project locally, run the following command in a command line:

```bash
# runs docker compose with the database
$ npm run start:compose
```

This command will run a local database and the actual API where you'll would be able to run any calls in the Postman collection shared.

## Requirements

### Data Models

- Create two data models:
- BlogPost;
- Comment.

A BlogPost has a title and content, and each BlogPost can have multiple Comments objects associated with it.

### API Endpoints:

- Implement the following API endpoints:
  - **[GET]** `/api/posts`: This endpoint should return a list of all blog posts, including their titles and the number of comments associated with each post;
  - **[POST]** `/api/posts`: Create a new blog post;
  - **[GET]** `/api/posts/{id}`: Retrieve a specific blog post by its ID, including its title, content, and a list of associated comments;
  - **[POST]** `/api/posts/{id}/comments`: Add a new comment to a specific blog post.
