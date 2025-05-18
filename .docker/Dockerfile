FROM node:22.15-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npx flowbite-react@latest init

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
