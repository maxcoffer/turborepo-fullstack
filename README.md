# Turborepo Fullstack Starter

This mono repository uses [Turporepo](https://turborepo.com/docs) and includes applications ([NextJS](https://nextjs.org) frontend and [NestJS](https://nestjs.com) backend). It's recommended to use [PNPM](https://pnpm.io) for workspaces management, but will work seamlessly with other package managers (additional setup required).

## Getting Started

Use proper [Node.js](https://nodejs.org/en) version:

```bash
nvm use
```

Install pnpm globally with `npm install -g pnpm` run the development server:

```bash
pnpm install
pnpm dev
```

### Apps & Packages

- `apps/server`: [NestJS](https://nestjs.com) server using Apollo GraphQL.
- `apps/webapp`: [NextJS](https://nextjs.org) frontend applications.
- `packages`: base configurations and shared types.

## Development

### Local Development

Optionally, copy `.env.example` for each of the packages located in `apps/` folder:

```bash
cp apps/webapp/.env.example .env
cp apps/server/.env.example .env
```

### Remote Caching

By default cache only works locally, it lives inside `node_modules/.cache/turbo`, and that means that we can't share the cache between machines. To add remote caching:

```bash
npx turbo login
npx turbo link
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [NextJS Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn NextJS](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Continues Integration

GitHub Actions used for CI (Continues Integration) pipeline and custom deployment to [Vercel](https://vercel.com/home). Deperend on the infrostructure provider it could be changed to any other, like AWS or CloudFlare. See full documentation on CI pipeline setup in [RELEASE.md](RELEASE.md)
