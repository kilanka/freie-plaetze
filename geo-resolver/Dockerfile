FROM node:20

WORKDIR /app/geo-resolver

COPY package.json package-lock.json ../
COPY geo-resolver/package.json ./
RUN npm ci -w geo-resolver

COPY geo-resolver .
RUN npm run build

ENV NODE_ENV production

USER node

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
