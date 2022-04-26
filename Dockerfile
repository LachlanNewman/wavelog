FROM node:16


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . /home/node/app
WORKDIR /home/node/app

RUN npm i && \
    npm run build 


CMD ["npm","start"]