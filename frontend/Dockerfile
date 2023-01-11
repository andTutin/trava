FROM node:18.12.1-alpine3.16 as base

WORKDIR /frontend

COPY package.json .

EXPOSE 5173



FROM base as dev

CMD [ "npm", "run", "dev" ]



FROM base as prod

RUN npm install

COPY .  .

RUN npm run build

CMD [ "npm", "run", "preview" ]