# MEAN Stack Monorepo Quick Starter

Full stack monorepo based on `NPM Workspaces`.

- Language: `Typescript`
- Frontend: `Angular 17` with routing and `SASS`
- Backend: `Express`
- Database: `MongoDB`
- ODM: `Mongoose`

## Features

- `NPM Workspaces` monorepo
- `api` and `ui` packages are independent and both import common types from `common` package
- `OIDC` authentication
- Inlcuded Github Actions checks on pull requests
- Inlcuded Dockerfile for both `api` and `ui` packages

## Prerequisites

Ensure you have the following installed on your machine:

- `Node.js`: 20
- `@angular/cli`: 17

## Getting Started

Install dependencies:

```bash
npm i
```

Run project in development mode

If auth is not yet configured, run the following command to start the project without auth:

```bash
npm run noauth # no auth mode
```

if Auth url is provided in `api` .env and in `ui` app.config.json

```bash
npm start # with auth mode
```

## Building

Build the project:

```bash
npm run build
```
