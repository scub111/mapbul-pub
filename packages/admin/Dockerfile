FROM node:13-alpine as installer

ARG npm_token
ENV NPM_TOKEN=${npm_token}

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY .npmrc .npmrc
RUN echo -e "\n//artifacts.vostokservices.com/repository/npm/:_authToken=NpmToken.${NPM_TOKEN}" >> ".npmrc"
RUN cat .npmrc
RUN npm i -q

FROM installer AS build

WORKDIR /app
COPY nginx.conf nginx.conf
COPY .env.production .env.production
COPY tsconfig.json tsconfig.json
COPY tsconfig.prod.json tsconfig.prod.json
COPY stylus.d.ts stylus.d.ts
COPY window.d.ts window.d.ts
COPY png.d.ts png.d.ts
COPY svg.d.ts svg.d.ts
COPY src src
COPY config config
COPY scripts scripts
COPY public public

ARG OUTLINE
RUN npm run build
RUN npm publish
