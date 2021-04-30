FROM node:lts-alpine

WORKDIR .

COPY . .

RUN npm install && npm rebuild node-sass
RUN npm run build
