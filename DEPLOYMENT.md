# 🚀 Deployment Guide for www.ultimaitech.com

## Prerequisites
- Domain purchased: www.ultimaitech.com
- GitHub repository with your code
- Node.js 18+ installed locally

## Option 1: Vercel (Frontend) + Railway (Backend) - RECOMMENDED

### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy to Vercel:**
   ```bash
   cd Frontend
   vercel --prod
   ```

4. **Configure Domain:**
   - Go to Vercel Dashboard
   - Add your domain: `ultimaitech.com`
   - Update DNS records as instructed by Vercel

### Backend Deployment (Railway)

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy the backend folder**
4. **Set environment variables:**
   - `PORT=5001`
   - `NODE_ENV=production`
   - Add your database connection strings

5. **Get your backend URL** (e.g., `https://your-app.railway.app`)

6. **Update Frontend Environment:**
   - In Vercel, add environment variable: `VITE_API_URL=https://your-app.railway.app`
   - Redeploy frontend

## Option 2: Netlify (Frontend) + Railway (Backend)

### Frontend Deployment (Netlify)

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy to Netlify:**
   ```bash
   cd Frontend
   netlify deploy --prod
   ```

4. **Configure Domain:**
   - Go to Netlify Dashboard
   - Add your domain: `ultimaitech.com`
   - Update DNS records as instructed by Netlify

## DNS Configuration

### For Vercel:
```
Type: A
Name: @
Value: 76.76.19.76

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For Netlify:
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

## Environment Variables

### Frontend (.env.production):
```env
VITE_API_URL=https://your-backend-url.railway.app
VITE_ANALYTICS_ENABLED=true
```

### Backend (.env):
```env
NODE_ENV=production
PORT=5001
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
```

## Testing Your Deployment

1. **Build locally first:**
   ```bash
   cd Frontend
   npm run build:prod
   npm run preview
   ```

2. **Check the build output in `dist/` folder**

3. **Deploy and test your live site**

## Troubleshooting

### Common Issues:
- **404 on refresh**: Ensure SPA routing is configured (already done in config files)
- **API calls failing**: Check CORS settings and environment variables
- **Build failures**: Ensure all dependencies are in package.json

### Performance Optimization:
- Images are optimized in the build
- Code splitting is configured
- Caching headers are set for assets

## Support

If you encounter issues:
1. Check the deployment logs in your hosting platform
2. Verify environment variables are set correctly
3. Ensure your domain DNS is pointing to the right hosting provider

## Cost Estimation

- **Vercel**: Free tier (100GB bandwidth/month)
- **Railway**: Free tier (500 hours/month)
- **Domain**: ~$10-15/year (already purchased)
- **Total**: ~$0-5/month for small to medium traffic

---

**Next Steps:**
1. Choose your hosting platform (Vercel recommended)
2. Deploy backend first, then frontend
3. Configure your domain
4. Test everything works
5. Share your live website! 🎉
