FROM node:18

WORKDIR /app

COPY ../package*.json ./

RUN npm install

COPY ../.env .env
COPY . .

# RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
