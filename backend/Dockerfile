FROM node:22-alpine

WORKDIR /app

RUN apk update && apk upgrade --no-cache

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]