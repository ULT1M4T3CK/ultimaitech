module.exports = {
  apps: [
    {
      name: 'ultimaitech-web',
      script: 'server.js',
      cwd: '/opt/ultimaitech-next',
      autorestart: true,
      max_restarts: 15,
      min_uptime: '5s',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3003,
        HOSTNAME: '0.0.0.0',
        INTERNAL_API_URL: 'http://127.0.0.1:3002/api/blog',
      },
    },
  ],
};
