FROM node:22.15.0-alpine AS alpine

# This Dockerfile uses partial monorepo strategy for backend server
# More details here: https://turborepo.com/docs/guides/tools/docker

RUN apk update
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
# to understand why libc6-compat might be needed
RUN apk add --no-cache libc6-compat

# Setup PNPM and Turbo on the image
FROM alpine as base
RUN npm install pnpm@^9 turbo@^2 --global --no-cache
RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3

# Prune projects
FROM base AS pruner
ARG PROJECT=@monorepo/server

WORKDIR /app
COPY . .
RUN turbo prune --scope=${PROJECT} --docker

# Build Project
FROM base AS builder
ARG PROJECT=@monorepo/server

# Railway service used to cache pnpm store
# But unfortunately it needs to be hardcoded
ARG RAILWAY_SERVICE_ID
RUN echo ${RAILWAY_SERVICE_ID}

# These arguments enable remote cacheing inside docker build
# And they need to be here because the token always changes which stops all further lines from being cached
ARG TURBO_TOKEN
ENV TURBO_TOKEN=${TURBO_TOKEN}
ARG TURBO_TEAM
ENV TURBO_TEAM=${TURBO_TEAM}
ARG TURBO_API
ENV TURBO_API=${TURBO_API}

WORKDIR /app

# Copy lockfile and package configs
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# First install only production deps and cache them, then install all deps
# Note that 'id' here is a value of the RAILWAY_SERVICE_ID environment variable
RUN --mount=type=cache,id=s/6be82436-ee3a-4108-bce9-29e2bc8cb307-/root/.local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm install --frozen-lockfile
# Then copy over the application files (change often, no longer cached from this step on)
COPY --from=pruner /app/out/full/ .

# Build the project
RUN turbo build --filter=${PROJECT}
# Switch deps over to production only and prune out not needed files
# Note that 'id' here is a value of the RAILWAY_SERVICE_ID environment variable
RUN --mount=type=cache,id=s/6be82436-ee3a-4108-bce9-29e2bc8cb307-/root/.local/share/pnpm/store/v3,target=/root/.local/share/pnpm/store/v3 pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

# Prepare final production image
FROM alpine AS runner
ARG PROJECT_PATH=server

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .
WORKDIR /app/apps/${PROJECT_PATH}

ARG SERVER_PORT=3000
ENV SERVER_PORT=${SERVER_PORT}
ENV NODE_ENV=production

EXPOSE ${SERVER_PORT}

CMD node dist/main.js