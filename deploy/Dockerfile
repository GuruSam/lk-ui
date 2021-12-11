FROM node:14-alpine

WORKDIR .

COPY . .

RUN npm install && npm rebuild node-sass
RUN npm run build
