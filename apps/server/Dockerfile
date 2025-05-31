FROM node:22.15.0-alpine AS base

# This Dockerfile uses partial monorepo strategy for backend server.
# More details here: https://turborepo.com/docs/guides/tools/docker

# Separate step to get a pruned version of the monorepository
FROM base AS turbo
RUN npm install turbo@^2 --global --no-cache
COPY . .
RUN turbo prune --scope=@monorepo/server --docker

# Separate step to install dependencies, most of this will be cached if dependencies wont change
FROM turbo AS builder
RUN apk update
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
# First install the dependencies (as they change less often)
COPY --from=turbo /app/out/json/ .
COPY --from=turbo /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=turbo /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=turbo /app/turbo.json ./turbo.json

# Install dependencies needed for local development
RUN npm install -g pnpm@9.0.0
RUN pnpm install --frozen-lockfile
RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3

# First install only production deps and cache them, then install all deps
RUN --mount=type=cache,id=s/6be82436-ee3a-4108-bce9-29e2bc8cb307-/root/.local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm install --omit=dev --ignore-scripts && cp -R node_modules node_modules_production && pnpm install
# Then copy over the application files (change often, no longer cached from this step on)
COPY --from=turbo /app/out/full/ .

# These arguments enable remote cacheing inside docker build
# And they need to be here because the token always changes which stops all further lines from being cached
ARG TURBO_TOKEN
ARG TURBO_TEAM
ARG TURBO_API

# Set working directory
WORKDIR /app

# Build the project
RUN turbo run build --filter=@monorepo/server
# Switch deps over to production only and prune out not needed files
RUN rm -rf node_modules && mv node_modules_production node_modules && apk --no-cache add curl && curl -sf https://gobinaries.com/tj/node-prune | sh && node-prune

FROM base AS runner
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user
RUN chown -R user:nodejs /app
USER user

COPY --from=builder --chown=user:nodejs /app .

WORKDIR /app/apps/server

CMD node ./dist/main.js