FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose default Next.js port
EXPOSE 3000

# Start in development mode
CMD ["npm", "run", "dev"]