FROM node:20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /source
WORKDIR /source
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter frontend install --frozen-lockfile
RUN pnpm --filter frontend run build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter frontend deploy --prod /app

FROM base AS app
COPY --from=build --chown=node:node /app /app
WORKDIR /app

ENV NODE_ENV production

USER node

EXPOSE 8080

CMD ["pnpm", "start"]
