FROM node:18.12.1-alpine3.16 as base

WORKDIR /backend

COPY package.json .

EXPOSE 3000



FROM base as dev

CMD [ "npm", "run", "start:dev" ]



FROM base as prod

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]