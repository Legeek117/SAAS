FROM node:20-alpine

WORKDIR /app

# Enable development mode
ENV NODE_ENV development

# Install dependencies based on the preferred package manager
COPY package.json ./
RUN npm install

# Copy source code
COPY . .

# Create missing public directory if needed
RUN mkdir -p public

EXPOSE 3000

CMD ["npm", "run", "dev"]
