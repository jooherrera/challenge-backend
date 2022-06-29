FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

COPY dist ./dist

EXPOSE 3000/tcp

CMD "npm" "run" "start"

