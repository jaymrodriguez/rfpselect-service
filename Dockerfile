FROM node:10.1-alpine
WORKDIR /usr/src/app
# we are at the working directory and have an ignore file, copy everything
COPY . .
# Install dependencies
RUN yarn install

EXPOSE 8080