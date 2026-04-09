FROM node:20-bullseye-slim

WORKDIR /app

# Enable development mode
ENV NODE_ENV development

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client
RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "dev"]
