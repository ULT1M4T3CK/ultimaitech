FROM node:18-alpine

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S frontend -u 1001

WORKDIR /app

# Set proper ownership
RUN chown -R frontend:nodejs /app

# Copy package files and install dependencies as root
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Switch to non-root user
USER frontend

# Expose port
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
