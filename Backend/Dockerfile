FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

ENV PORT=8000
EXPOSE ${PORT}

CMD ["npm", "start"]
