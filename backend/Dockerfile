FROM node:20
WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . /app
RUN yarn build
CMD ["yarn", "start"]