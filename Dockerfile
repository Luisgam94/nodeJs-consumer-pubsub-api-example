FROM node:13
COPY package.json .
RUN npm install
COPY src src
CMD node src/index.js
EXPOSE 3000