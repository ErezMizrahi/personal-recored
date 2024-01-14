FROM node:alpine

WORKDIR /usr/src/app

RUN rm -f package.json

COPY package.json .

RUN rm -rf node_modules
RUN rm -f package-lock.json

RUN npm cache clean --force

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]