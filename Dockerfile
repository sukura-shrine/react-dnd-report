FROM node:18-alpine

RUN npm i -g pnpm 

WORKDIR /srv/src
CMD pnpm install && pnpm start