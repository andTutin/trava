FROM node:18.12.1-alpine3.16

WORKDIR /frontend

COPY package.json .

RUN npm i

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]