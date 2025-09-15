###
# BUILD STAGE
###
FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN npm run build

###
# RUN STAGE
###
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm i ci --omit=dev

COPY --from=builder app/dist/apps/api ./src/
# COPY .env.docker .env

USER node
EXPOSE 3000
CMD ["node", "/app/src/main.js"]