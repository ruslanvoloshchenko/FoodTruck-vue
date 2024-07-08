# Use the official Node.js image from Docker Hub
FROM node:20

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package.json ./
COPY . .

# Install dependencies
RUN npm install -g npm@10.8.1

RUN npm install

# Copy the rest of the application files

RUN npm run build

# Expose the port the app runs on
EXPOSE 80

# Define the command to run the application
CMD ["node", "server.js"]
