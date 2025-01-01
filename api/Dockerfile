FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Prisma CLI globally
RUN npm install -g prisma

# Dev dependencies for hot reload
RUN npm install --save-dev

EXPOSE 3000

# Start NestJS in dev mode
CMD npx prisma generate && npx prisma migrate deploy && npm run start:dev