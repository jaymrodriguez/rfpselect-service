FROM node:10.1-alpine
WORKDIR /usr/src/app

# Install dependencies
COPY  package.json .
COPY  yarn.lock .
RUN yarn install

# we are at the working directory and have an ignore file, copy everything
COPY . .

RUN yarn build
EXPOSE 3000
CMD [ "yarn" , "start"]

# production image
# FROM nginx:1.14.0-alpine
# COPY --from=0 /usr/src/app/build /usr/share/nginx/html
# # COPY --from=builder /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]
