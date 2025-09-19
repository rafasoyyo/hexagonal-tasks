# hexagonal-tasks [WIP]

App to manage tasks using hexagonal architecture based on [Nest](https://github.com/nestjs/nest) framework.

## Description
This is a mono-repository that includes three apps: CLI, API and web(SSR) with the following requisites:

 ### Functionality
  * CRUD Tasks
  * CRUD USERS [WIP]

 ### Architecture
 * Domain Driven Design
 * Hexagonal Architecture

 ### Storage
 * Storage on Mongo or Postgres as desired without fancy ORMs (Prisma)

 ### Features
 * Swagger
 * JSDocs [WIP]
 * Add Auth [WIP]
 * Manage roles and permissions [WIP]
 * Manage Cache (Redis) [WIP]
 * Include versioning [WIP]
 * Queue of tasks [WIP]
 * Test Coverage > 95% [WIP]

 ### Infra
 * Decide a place to host it [WIP]
 * Create the CI/CD pipelines [WIP]

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# API watch mode
$ npm run start:api

# WEB watch mode
$ npm run start:web

# CLI execute command
$ npm run start:cli

```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
