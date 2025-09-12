FROM node:18-alpine
RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4005

CMD ["npm", "start"]