FROM node:22 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /source
WORKDIR /source
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter backend install --frozen-lockfile
RUN pnpm --filter backend run build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter backend deploy --prod /app --legacy

FROM base AS app
COPY --from=build --chown=node:node /app /app
WORKDIR /app
# Generate the prisma client in-place because `pnpm deploy` doesn't copy it from `node_modules`
RUN pnpm exec keystone prisma generate

ENV NODE_ENV=production
ENV APP_ENV=production
ENV IMAGES_PATH=/images

RUN mkdir ${IMAGES_PATH} && chown node:node ${IMAGES_PATH}

VOLUME ${IMAGES_PATH}

USER node

EXPOSE 3000

CMD ["pnpm", "start"]
