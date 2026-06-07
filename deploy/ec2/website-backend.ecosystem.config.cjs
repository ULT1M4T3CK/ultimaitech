// PM2 cwd must stay /opt/website-backend so dotenv loads DATABASE_URL from .env (not rsynced; use provision-postgres).
module.exports = {
  apps: [
    {
      name: 'website-blog-api',
      script: 'src/index.js',
      cwd: '/opt/website-backend',
      autorestart: true,
      max_restarts: 15,
      min_uptime: '5s',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
        HTML_ROOT: '/var/www/ultimaitech/html',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002,
        HTML_ROOT: '/var/www/ultimaitech/html',
      },
    },
  ],
};
