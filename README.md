# UltimAItech Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Node.js. Features an admin panel for content management and a beautiful frontend for showcasing projects.

## 🚀 Features

- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS
- **Admin Panel**: Secure authentication and content management
- **Project Management**: Add, edit, and delete portfolio projects
- **File Uploads**: Support for project images and files
- **Analytics**: Track visitor interactions and project views
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Security**: JWT authentication, rate limiting, and security headers

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- JWT authentication
- Multer for file uploads
- Rate limiting and security middleware

### Infrastructure
- Docker and Docker Compose
- PostgreSQL database
- Nginx (optional for production)

## 📁 Project Structure

```
UltimAItech/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   └── main.tsx        # Application entry point
│   ├── public/
│   │   └── images/
│   │       ├── ultimaitech-logo.png
│   │       └── hero-background.png
│   └── package.json
├── backend/                  # Node.js backend API
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── database/       # Database configuration
│   │   └── index.ts        # Server entry point
│   └── package.json
├── uploads/                  # File upload directory
├── docker-compose.yml        # Docker services configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- PostgreSQL (if running locally)

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd UltimAItech
   ```

2. **Start all services**
   ```bash
   npm run docker:up
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5002
   - Admin Panel: http://localhost:3000/admin

### Option 2: Local Development

1. **Install dependencies**
   ```bash
   npm run install:all
   ```

2. **Set up the database**
   ```sql
   CREATE DATABASE ultimaitech_portfolio;
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your database credentials
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Backend (.env)
```bash
PORT=5000
DB_HOST=localhost
DB_NAME=ultimaitech_portfolio
DB_USER=postgres
DB_PASSWORD=your_password_here
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

### Frontend
The frontend automatically detects the backend URL based on the environment.

## 📊 Database Setup

The application uses PostgreSQL. You can set up the database manually or use the provided Docker setup.

### Manual Setup
```sql
CREATE DATABASE ultimaitech_portfolio;
CREATE USER ultimaitech_user WITH PASSWORD 'ultimaitech_password';
GRANT ALL PRIVILEGES ON DATABASE ultimaitech_portfolio TO ultimaitech_user;
```

### Docker Setup
The Docker Compose file automatically creates the database with the correct credentials.

## 🎨 Customization

### Styling
- Modify `Frontend/src/index.css` for global styles
- Update Tailwind configuration in `Frontend/tailwind.config.js`
- Customize component styles in individual component files

### Content
- Update company information in component files
- Modify the hero section in `Frontend/src/pages/Home.tsx`
- Update the footer in `Frontend/src/components/Footer.tsx`

### Logo and Images
- Replace `Frontend/public/images/ultimaitech-logo.png` with your logo
- Update `Frontend/public/images/hero-background.png` for the hero section
- Modify image references in components

## 🔒 Security Features

- **JWT Authentication**: Secure admin access
- **Rate Limiting**: Prevents abuse of API endpoints
- **CORS Protection**: Configurable cross-origin requests
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Server-side validation of all inputs
- **File Upload Security**: Restricted file types and sizes

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment Considerations
- Set `NODE_ENV=production`
- Use strong JWT secrets
- Configure proper CORS origins
- Set up SSL/TLS certificates
- Use environment-specific database credentials

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials in `.env`
   - Ensure PostgreSQL is running
   - Verify database exists

2. **Frontend Can't Connect to Backend**
   - Check backend server is running
   - Verify API URL configuration
   - Check CORS settings

3. **File Uploads Not Working**
   - Ensure uploads directory exists
   - Check file permissions
   - Verify multer configuration

4. **Docker Issues**
   - Check Docker and Docker Compose versions
   - Ensure ports are not already in use
   - Check Docker logs: `npm run docker:logs`

### Logs and Debugging
```bash
# Backend logs
cd backend && npm run dev

# Docker logs
npm run docker:logs

# Database connection test
cd backend && npm run setup:db
```

## 🚀 Server Deployment Guide

### Prerequisites for Server Deployment
- **Ubuntu 20.04+** or similar Linux distribution
- **Docker** and **Docker Compose** installed
- **2GB RAM** minimum (4GB recommended)
- **Node.js 18+** (for build processes)
- **Domain name** (optional, for custom domain deployment)

### 1. Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER

# Install Node.js (for build processes)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Create deployment directory
sudo mkdir -p /opt/ultimaitech
sudo chown $USER:$USER /opt/ultimaitech
```

### 2. Application Deployment

```bash
# Navigate to deployment directory
cd /opt/ultimaitech

# Clone or copy your application files
git clone https://github.com/yourusername/ultimaitech.git .
# OR copy your project files here

# Make deployment script executable
chmod +x deploy.sh

# Generate secure secrets
npm run setup:production

# Configure environment variables
cd backend
cp env.example .env
# Edit .env with your actual values:
# - Database password
# - JWT secrets
# - Domain name for CORS
# - Admin credentials

# Deploy the application
./deploy.sh
```

### 3. Domain Configuration (Optional)

For custom domain deployment:

1. **DNS Configuration**
   ```bash
   # Point your domain to your server IP
   # A record: ultimaitech.com -> YOUR_SERVER_IP
   # A record: www.ultimaitech.com -> YOUR_SERVER_IP
   ```

2. **SSL Certificate** (Let's Encrypt)
   ```bash
   # Install certbot
   sudo apt install certbot python3-certbot-nginx -y

   # Generate SSL certificate
   sudo certbot --nginx -d ultimaitech.com -d www.ultimaitech.com
   ```

3. **Update Application Configuration**
   ```bash
   # Edit backend/.env
   CORS_ORIGIN=https://ultimaitech.com,https://www.ultimaitech.com
   ```

### 4. Production Monitoring

```bash
# Check application status
npm run deploy:status

# View logs
npm run docker:logs

# Restart if needed
npm run docker:rebuild

# Check health endpoints
curl http://localhost:3000
curl http://localhost:5002/health
```

## 🔧 Environment Variables

### Required for Production

```bash
# Database (generate secure passwords)
DB_PASSWORD=your_secure_db_password_here
JWT_SECRET=your_64_char_jwt_secret_here
SESSION_SECRET=your_32_char_session_secret_here

# Domain Configuration
CORS_ORIGIN=https://ultimaitech.com,https://www.ultimaitech.com

# Admin Credentials (change these!)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_admin_password
```

### Generate Secure Secrets

```bash
# Generate JWT secret (64 characters)
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Generate session secret (32 characters)
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

## 📊 Database Setup

The application uses PostgreSQL for data persistence.

### Docker Setup (Automatic)
The Docker Compose file automatically creates the database with correct credentials.

### Manual Setup
```sql
CREATE DATABASE ultimaitech_portfolio;
CREATE USER ultimaitech_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ultimaitech_portfolio TO ultimaitech_user;
```

## 🔒 Security Features

- **JWT Authentication**: Secure admin access with token-based authentication
- **Rate Limiting**: Prevents abuse of API endpoints
- **CORS Protection**: Configurable cross-origin requests
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Server-side validation of all inputs
- **File Upload Security**: Restricted file types and sizes

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop** (1200px+): Full-featured experience with all animations
- **Tablet** (768px - 1199px): Optimized layout with touch interactions
- **Mobile** (320px - 767px): Touch-friendly interface with simplified navigation

## 🚀 Production Deployment

### Full-Stack Production
```bash
# Build frontend for production
npm run build

# Use Docker for production deployment
docker-compose -f docker-compose.prod.yml up -d

# Or configure with your hosting provider
# Set NODE_ENV=production in environment variables
```

### Environment Considerations
- Set `NODE_ENV=production` for optimized builds
- Use strong JWT secrets in production
- Configure proper CORS origins for your domain
- Set up SSL/TLS certificates for secure connections
- Use environment-specific database credentials

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check database credentials in `.env`
   - Ensure PostgreSQL is running
   - Verify database exists and user has permissions

2. **Frontend Can't Connect to Backend**
   - Check backend server is running on correct port
   - Verify API URL configuration in Vite proxy settings
   - Check CORS settings in backend

3. **File Uploads Not Working**
   - Ensure uploads directory exists and has write permissions
   - Check file size limits in multer configuration
   - Verify file type restrictions

4. **Docker Issues**
   - Check Docker and Docker Compose versions
   - Ensure ports are not already in use
   - Check Docker logs: `npm run docker:logs`

### Logs and Debugging
```bash
# Backend logs
cd backend && npm run dev

# Docker logs
npm run docker:logs

# Database connection test
cd backend && npm run setup:db
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly (both static and full-stack modes)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Vite** for fast build tooling
- **PostgreSQL** for reliable data storage
- **The open-source community** for inspiration and contributions

---

**Built with ❤️ by the UltimAItech Team**

*Transforming businesses with custom AI solutions since 2024*
