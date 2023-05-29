FROM node:20.2.0-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
RUN npm run build

ARG PORT
ARG DATABASE_NAME
ARG DATABASE_USER
ARG DATABASE_PASSWORD
ARG DATABASE_HOST
ARG DATABASE_DIALECT
ARG JWT_SECRET_KEY
ARG DOMAIN
ARG EMAIL_USER
ARG EMAIL_PASS
ARG EMAIL_HOST
ARG EMAIL_FROM
ARG RESET_PASS_KEY


ENV PORT=${PORT}
ENV DATABASE_NAME=${DATABASE_NAME}
ENV DATABASE_USER=${DATABASE_USER}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV DATABASE_HOST=${DATABASE_HOST}
ENV DATABASE_DIALECT=${DATABASE_DIALECT}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV DOMAIN=${DOMAIN}
ENV EMAIL_USER=${EMAIL_USER}
ENV EMAIL_PASS=${EMAIL_PASS}
ENV EMAIL_HOST=${EMAIL_HOST}
ENV EMAIL_FROM=${EMAIL_FROM}
ENV RESET_PASS_KEY=${RESET_PASS_KEY}



CMD ["node", "dist/index.js"]
