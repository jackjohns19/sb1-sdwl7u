# Use an official Node runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install a simple HTTP server to serve static content
RUN npm install -g http-server

# Expose port 3005
EXPOSE 3005

# Start the HTTP server
CMD ["http-server", "dist", "-p", "3005"]