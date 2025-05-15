FROM node:22 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /source
WORKDIR /source
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter geo-resolver install --frozen-lockfile
RUN pnpm --filter geo-resolver run build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter geo-resolver deploy --prod /app --legacy

FROM base AS app
COPY --from=build --chown=node:node /app /app
WORKDIR /app

ENV NODE_ENV=production

USER node

EXPOSE 3001

CMD ["pnpm", "run", "start:prod"]
