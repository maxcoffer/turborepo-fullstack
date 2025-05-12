# Turborepo Fullstack Starter

This mono repository uses [Turporepo](https://turborepo.com/docs) and includes applications ([NextJS](https://nextjs.org) frontend and [NestJS](https://nestjs.com) backend). It's recommended to use [PNPM](https://pnpm.io) for workspace management, but will work seamlessly with other package managers (additional setup required).

## Getting Started

First, install pnpm globally with `npm install -g pnpm` run the development server:

```bash
pnpm install
pnpm dev
```

### Apps & Packages

- `apps/server`: [NestJS](https://nestjs.com) server using Apollo GraphQL and Drizzle ORM.
- `apps/nextjs`: [NextJS](https://nextjs.org) frontend application.
- `packages`: base configurations and shared types.

## Development

### Local Development

[Docker](https://docker.com) used for local development, so it need to be installed on local machine.

#### Workspaces

To install additional dependencies into specific workspaces:

```bash
pnpm add <package> --filter @monorepo/<app>
```

#### Turbo Code Generation

For further applications or packages setup use `turbo gen`:

```bash
pnpm dlx turbo gen workspace --name <app> --type app
pnpm dlx turbo gen workspace --name <package> --type package
```

### Remote Caching

By default cache only works locally, it lives inside `node_modules/.cache/turbo`, and that means that we can't share the cache between machines. To add remote caching:

```bash
npx turbo login
npx turbo link
```

## Learn More

To learn more about used stack take a look at the following resources:

- [Turborepo](https://turborepo.com/docs) - monorepo handler documentation.
- [NestJS Docs](https://docs.nestjs.com) - learn more aboout NestJS.
- [NextJS Docs](https://nextjs.org/docs) - learn about NextJS features and API.

## Continues Integration

GitHub Actions used for CI (Continues Integration) pipeline and custom deployment to [Vercel](https://vercel.com/home). Deperend on the infrostructure provider it could be changed to any like AWS or CloudFlare.
