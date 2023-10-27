# Backend Dockerfile – frontend is deployed using Vercel

FROM node:18

WORKDIR /app/backend

COPY package.json package-lock.json ../
COPY backend/package.json ./
RUN npm ci -w backend

COPY backend .
RUN npm run build

ENV NODE_ENV production
ENV APP_ENV production
ENV IMAGES_PATH /images

RUN addgroup --system --gid 1001 keystone
RUN adduser --system --uid 1001 keystone
RUN chown -R keystone:keystone node_modules/.keystone node_modules/.prisma .keystone

RUN mkdir ${IMAGES_PATH} && chown -R keystone:keystone ${IMAGES_PATH}

# It seems NPM needs this directory – at least it tries to create it and would error out if it
# weren't allowed to
RUN mkdir /nonexistent && chown -R keystone:keystone /nonexistent

VOLUME /images

USER keystone

EXPOSE 3000

CMD ["npm", "start"]
