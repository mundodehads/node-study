FROM node:8-alpine

RUN mkdir -p /code
WORKDIR /code

COPY index.js /code/
COPY render.js /code/

EXPOSE 3002
CMD [ "node", "index.js" ]
