# Define node version
FROM node:14-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN npm run build --prod -- --output-path=dist

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the built Angular app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]