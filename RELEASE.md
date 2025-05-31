# Continues Integration

Confiuguration and CI (Continues Integration) pipeline to for the project using [GitHub Actions](https://github.com/features/actions) to deploy on Vercel as a separate projects for Server and Web Applications.

## Environment Setup

Before running any pipeline, you have to create project in [Vercel](https://vercel.com) and add necessary environment variables.

For Web Application project as `@monorepo/webapp` located in `apps/webapp` framework will be automatically detected, as well as Turporepo source, and defaults will be applied for NextJS application.

### Vercel Project

Add following secrets as [Vercel Environment Variables](https://vercel.com/docs/environment-variables) for `@monorepo/webapp` project:

```bash
# Public host of the server application
NEXT_PUBLIC_SERVER_HOST=https://{server_domain_name}
```

In Vercel for each deployed project GitHub comments and automatic deployments should be disabled in project Settings > Git page (if you want to run them from GitHub Actions):

1. Disable "Pull Request Comments" toggle at the "Connected Git Repository" section.
2. Select "Don't build anything" option at the "Ignored Build Step" section.

### Railway Project

For Server Application as `@monorepo/server` located in `apps/server` you have to create [Railway](https://railway.com) account and project...

## GitHub Actions

Add following secrets and variables into [GitHub Variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables) for repository.

Secrets for GitHub Actions:

```bash
# Vercel access for NextJS deployment
VERCEL_TOKEN=
VERCEL_TEAM_ID=

# Railway deployment for NestJS application
```

Variables for GitHub Actions:

```bash
# Project unique identifier for NextJS
VERCEL_PROJECT=
```

## Production Release

Production workflow located in `.github/workflows/production.yaml` and it's triggered automatically when code pushed or PR closed and merged into `main` branch.

1. Checking which exact project code was updated since last checkout.
2. Prepare specified project build and run necessary scripts.
3. Deploy specified project to target Vercel project.
