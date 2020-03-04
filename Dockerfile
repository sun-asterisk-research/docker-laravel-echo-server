FROM node:12-alpine

WORKDIR /laravel-echo-server

COPY package.json yarn.lock ./

ENV NODE_ENV=production

RUN yarn --frozen-lockfile

RUN ln -s /laravel-echo-server/node_modules/.bin/laravel-echo-server /usr/local/bin/laravel-echo-server

COPY src src
COPY laravel-echo-server.json .

EXPOSE 6001

CMD [ "yarn", "start" ]
