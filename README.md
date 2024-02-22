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

### No Auth
If auth is not yet configured, run the following command to start the project without auth:

```bash
npm run noauth
```

### Configuring Auth
Configure auth:

1. **API Backend**: Create `/packages/api/.env` file with the following content:
For example:
```bash
AUTH_URL=https://yourauthprovider.io/_api/auth/tenantname
```
You can also peak into `.env-example` file for reference.

2. **UI Frontend**: Modify `/packages/ui/src/assets/app.config.json` and set 
- `authority` to `https://yourauthprovider.io/_api/auth/tenantname`
- `clientId` to `your-client-id`

Then run the following command to start the project with auth:

```bash
npm start
```

## Building

Build the project:

```bash
npm run build
```
