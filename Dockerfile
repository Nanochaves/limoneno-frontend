FROM node:12.7 as build
ARG REACT_APP_ENV
WORKDIR /usr/src/app
# Copiamos package.json y yarn.lock para utilizar el cache de layers si no cambia ningun paquete
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
COPY src/config/config.$REACT_APP_ENV.ts src/config/config.ts
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY conf/conf.d/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80