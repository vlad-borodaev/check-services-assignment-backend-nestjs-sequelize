FROM node:18 AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @nestjs/cli sequelize-cli

RUN yarn
RUN yarn build

RUN npm prune --production
RUN yarn autoclean



FROM node:18

WORKDIR /usr/src/app

COPY package.json .
COPY --from=BUILD_IMAGE /usr/src/app/node_modules node_modules
COPY --from=BUILD_IMAGE /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=BUILD_IMAGE /usr/local/bin /usr/local/bin

COPY --from=BUILD_IMAGE /usr/src/app/dist dist

COPY --from=BUILD_IMAGE /usr/src/app/.sequelizerc .sequelizerc
COPY --from=BUILD_IMAGE /usr/src/app/src/database/migrations src/database/migrations
COPY --from=BUILD_IMAGE /usr/src/app/models models

EXPOSE 4000

CMD [ "yarn", "start:prod" ]
