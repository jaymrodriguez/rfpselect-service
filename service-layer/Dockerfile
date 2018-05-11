FROM node:10.1-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY  package.json .
COPY  yarn.lock .
RUN yarn install

# we are at the working directory and have an ignore file, copy everything
COPY . .

EXPOSE 3000
CMD [ "yarn" , "start"]