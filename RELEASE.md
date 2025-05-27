# Continues Integration

Confiuguration and CI (Continues Integration) pipeline to for the project using [GitHub Actions](https://github.com/features/actions) to deploy on Vercel as a separate projects for Server and Web Applications.

## Environment Setup

Before running any pipeline, you have to create projects in [Vercel](https://vercel.com) and  add necessary environment variables.

1. For Web Application project as `@monorepo/webapp` located in `apps/webapp` framework will be automatically detected, as well as Turporepo source, and defaults will be applied for NextJS application.

2. For Server project as `@monorepo/server` located in `apps/server` settings and folder should be set manually (framework will not be detected), and for build comand it should be "nest build", and output directory should be set to "dist".

### Vercel Projects

Add following secrets as [Vercel Environment Variables](https://vercel.com/docs/environment-variables) for `@monorepo/webapp` project:

```bash
# Public host of the server application
NEXT_PUBLIC_SERVER_HOST=https://{server_domain_name}
```

In Vercel for each project automatic build and commenting should be disabled in project Settings > Git page:

1. Disable "Pull Request Comments" toggle at the "Connected Git Repository" section.
2. Select "Don't build anything" option at the "Ignored Build Step" section.

### GitHub Actions

Add following secrets and variables into [GitHub Variables](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables) for repository.

Secrets for GitHub Actions:

```bash
# Vercel account access token
VERCEL_ACCESS_TOKEN=
# Vercel team unique identifier
VERCEL_TEAM_ID=
```

Variables for GitHub Actions:

```bash
# Server project unique identifier
VERCEL_PROJECT_SERVER=
# Web application project unique identifier
VERCEL_PROJECT_WEBAPP=
```

## Production Release

Production workflow located in `.github/workflows/production.yaml` and it's triggered automatically when code pushed or PR closed and merged into `main` branch.

1. Checking which exact project code was updated since last checkout.
2. Prepare specified project build and run necessary scripts.
3. Deploy specified project to target Vercel project.
