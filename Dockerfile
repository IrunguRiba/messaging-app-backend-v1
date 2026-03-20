FROM node:alpine

WORKDIR /app

RUN npm install 

COPY package.json ./

COPY . .

EXPOSE 4000

CMD ["npm", "start"]