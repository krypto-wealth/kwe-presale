FROM node:16 

RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN yarn
RUN yarn build

EXPOSE 3000 
CMD yarn serve