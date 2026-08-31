# Use the official Node.js image as the base image
FROM node

# Set the working directory inside the container
# All following commands will run from /app
WORKDIR /app

# Copy only the dependency files first
# Example: package.json and package-lock.json
# Keeping this separate allows Docker to cache the npm install layer
COPY package*.json .

# Install all dependencies listed in package.json
# This layer is reused from cache if the package files haven't changed
RUN npm install

# Copy the rest of the application into the container
# Example: index.js, routes/, controllers/, etc.
# If only application code changes, Docker can reuse the npm install layer
COPY . .

# Expose the port where the app will run
EXPOSE 5173

# Start the Vite development server with --host to bind to 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host"]