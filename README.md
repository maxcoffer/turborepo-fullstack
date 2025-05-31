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
- `packages`: base configurations.

## Development

### Local Development

Copy `.env.example` for root and each of the packages located in `apps/` folder:

```bash
cp .env.example .env
cp apps/server/.env.example .env
cp apps/webapp/.env.example .env
```

### Remote Caching

#### Vercel Remote Cache

By default cache only works locally, it lives inside `.turbo/cache`, and that means that we can't share the cache between development and virtual machines. Turborepo uses [Vercel Remote Caching](https://vercel.com/docs/monorepos/remote-caching), it's free but require each developer to have an access to specified team (paid feature).

```bash
turbo login
turbo link
```

#### Custom Remote Cache

Alternatively, you can use custom remote cache server, for example deployed on [Railway](https://railway.com). In this case you need to login using custom URL for the remote cache server.

To keep your remote cache server credentials secure locally it's better to add `.turbo/config.json` file (which is excluded by `.gitignore`). Values should be set to the same environment variables:

```json
{
  "apiurl": "TURBO_API",
  "teamslug": "TURBO_TEAM",
  "token": "TURBO_TOKEN"
}
```

Or do same configuration using Turbo CLI:

```bash
turbo login --manual
```

After it you'll be prompted to enter API URL, team slug and token value, which are the same values described in "Turborepo remote cache" section of the root `.env.local` file. THis action will add "remoteCache" section in `turbo.json` (which is not very secure).

To have full advantage of automatic Turborepo configuration, you can additionally run:

```bash
turbo scan
```

#### Zero Config Custom Cache

Another way to pass environment variables to the runtime is to use [dotenv-cli](https://www.dotenv.org/docs/frameworks/turborepo/vercel#install-dotenv-cli) package installed as root project dependency:

```bash
pnpm install dotenv-cli -w --save-dev
```

And then use it as part of your scripts in `package.json` like so:

```json
{
  "scripts": {
    "build": "dotenv -- turbo run build"
  }
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [NextJS Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn NextJS](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Continues Integration

GitHub Actions used for CI (Continues Integration) pipeline and custom deployment to [Vercel](https://vercel.com/home). Deperend on the infrostructure provider it could be changed to any other, like AWS or CloudFlare. See full documentation on CI pipeline setup in [RELEASE.md](RELEASE.md)
