# Backend Dockerfile – frontend is deployed using Vercel

FROM node:16-alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app/backend

COPY package.json package-lock.json ../
COPY backend/package.json ./
RUN npm ci

COPY backend .
RUN npm run build

RUN addgroup --system --gid 1001 keystone
RUN adduser --system --uid 1001 keystone
RUN chown -R keystone:keystone node_modules/.keystone node_modules/.prisma
USER keystone

ENV APP_ENV production
ENV IMAGES_PATH /images
VOLUME /images

EXPOSE 3000

CMD ["npm", "start"]
