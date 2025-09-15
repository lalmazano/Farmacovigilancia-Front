FROM node:20 AS build

WORKDIR /app

COPY codigo .
RUN npm install
RUN npm run build


FROM nginx:latest AS ngi 
COPY --from=build /app/dist/presentacion /usr/share/nginx/html
COPY star_igssgt_org.crt /etc/ssl 
COPY produccion.key /etc/ssl 
COPY /conf/default.conf /etc/nginx/conf.d 
EXPOSE 80 
EXPOSE 443

