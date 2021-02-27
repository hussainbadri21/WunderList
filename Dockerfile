# Stage 1
FROM node:12.10.0-alpine
LABEL AUTHOR="hussainbadri786@gmail.com"
WORKDIR /app
RUN apk add --no-cache git && \
    apk add --no-cache chromium &&\
    npm install i -g pm2
COPY . ./
ARG ENV=dev
RUN echo $ENV
ENV NODE_ENV=$ENV

RUN cd client && \
    npm install && \
    npm audit fix && \
   if [ "$ENV" = "dev" ]; then npm run build-dev ;else npm run build ; fi  && \
    cd ../server && \
    npm install

RUN  ls && cd client/build && find . -type f -exec  sed -i  "s#static/#statics/#g" {} + && mv static statics

EXPOSE 3080
CMD [ "pm2-runtime","server/ecosystem.config.js" ]