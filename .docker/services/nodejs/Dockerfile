FROM node:18 AS deps

WORKDIR /var/www/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]