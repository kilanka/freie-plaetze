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
USER keystone

ENV NODE_ENV production
ENV IMAGES_PATH /images
VOLUME /images

EXPOSE 3000

CMD ["npm", "start"]
