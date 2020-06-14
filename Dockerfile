FROM mhart/alpine-node

WORKDIR /src

COPY package.json .

ARG MONGO_DB=${MONGO_DB}
ARG JWT_SECRET=${JWT_SECRET}
ARG SES_KEY=${SES_KEY}
ARG SES_SECRET=${SES_SECRET}
ARG SES_REGION=${SES_REGION}

RUN apk add --no-cache --virtual .gyp python make g++
RUN npm i

COPY . .

EXPOSE 80

CMD ["npm", "start"]
