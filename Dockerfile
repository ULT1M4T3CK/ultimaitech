# Build stage for the frontend
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY Frontend/package*.json ./
RUN npm ci

# Copy source code
COPY Frontend/ ./

# Build the application
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
