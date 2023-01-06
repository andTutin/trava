FROM node:18.12.1-alpine3.16

WORKDIR /backend

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]