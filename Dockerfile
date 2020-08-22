FROM python:buster AS data
WORKDIR /usr/src/app

RUN pip install httpx wikitextparser Pillow
COPY data .
RUN python main.py


FROM node:lts AS build
WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY src src
COPY static static
COPY rollup.config.js .
COPY --from=data /usr/src/app/output.json static/game-info.json
RUN npm run build


FROM node:lts
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/__sapper__ __sapper__
COPY --from=build /usr/src/app/static static
COPY package.json .
RUN npm install --only=prod


ENV PORT 8080
EXPOSE 8080

CMD [ "npm", "start" ]
