# COCUS code challenge

## About

This repository contains a solution for a code challenge made by COCUS.

## Documentation

[API Documentation](https://github.com/mundodehads/cocus-code-challenge/blob/development/API.md)

## Setup

### Prerequisites

To run this project you need to have installed in your machine this softawares:

Name | Version
---|---
`node` | 12 or above
`npm` | 6 or above

### Running local

To run this `REST API` locally, you need to open this folder on your terminal then run the following command:

```
npm start
```

After that you can consume your API on `http://localhost:3000/dev/<path>`. 

### Deploy on AWS

To deploy this application on AWS you need to install `AWS CLI` and use `aws configure` to have a default user on your machine that is required to run serverles deploy.

Then, you can run the following command to deploy this application on a development environment:

```
npm run deploy:dev
```

That deploy will generate for you a deployed `API Gateway` with the routes described on descriptors and link that route with your `Lambda` handler that will be also deployed.

Others services that will be needed is a S3 bucket and some IAM roles that'll be automatically generated.

After the deploy is completed, you can access your `AWS Console` and enter `API Gateway` to find your project then check the stage to get your `API URL` and consume it.

## Tests

### Lint

To run the lint that was chosen to this project (ESLINT for Typescript) you can run the following command:

```
npm run lint
```

### Unit tests

To run the unit tests and get it coverage you can run the following command:

```
npm test
```

Then you can acess the generated folder called `coverage` then the folder `Ivoc-report` and open `index.html` file to a better visualization.