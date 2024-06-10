FROM node:18 as base

FROM base as production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]