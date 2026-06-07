FROM node:18-alpine

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S backend -u 1001

WORKDIR /app

# Set proper ownership
RUN chown -R backend:nodejs /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create uploads directory with proper permissions
RUN mkdir -p uploads && chown -R backend:nodejs uploads

# Remove package.json and node_modules from src to prevent access to dev dependencies
RUN rm -rf src/

# Switch to non-root user
USER backend

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
