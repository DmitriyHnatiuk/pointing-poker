FROM node:18-alpine
WORKDIR /app
COPY ./package*.json ./
COPY . .
COPY ./src/ ./src/

EXPOSE 4000

RUN npm i
# RUN npm run build

# CMD [ "yarn", "run", "build:container" ]