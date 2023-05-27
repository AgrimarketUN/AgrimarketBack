FROM node:20.2.0-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["node", "dist/index.js"]