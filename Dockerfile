FROM node:20.11.0-alpine3.18

LABEL maintainer="chris.adadev.org"

RUN apk add --no-cache bash

RUN mkdir /app

WORKDIR /app

# Add entire student fork (overwrites previously added files)
ARG SUBMISSION_SUBFOLDER
ADD $SUBMISSION_SUBFOLDER /app

RUN npm install
RUN chmod +x test.sh
