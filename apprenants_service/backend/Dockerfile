# Use Node.js 22 base image
FROM node:22.12.0

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables file
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
