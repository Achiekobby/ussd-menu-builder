# Deployment Guide

This guide covers multiple deployment options for the USSD Menu Flow Builder application.

## 🚀 Quick Deploy Options

### 1. **Netlify (Recommended)**

**Steps:**
1. Build the project: `npm run build`
2. Drag and drop the `build` folder to [Netlify](https://netlify.com)
3. Your app will be live instantly!

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

### 2. **Vercel**

**Steps:**
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel --prod`
3. Connect your GitHub repo for automatic deployments

### 3. **GitHub Pages**

**Steps:**
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/ussd-menu-flow",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy: `npm run deploy`

## ☁️ Cloud Platform Deployments

### **AWS S3 + CloudFront**

1. **Create S3 Bucket:**
   ```bash
   aws s3 mb s3://your-ussd-app
   aws s3 website s3://your-ussd-app --index-document index.html --error-document index.html
   ```

2. **Upload Build Files:**
   ```bash
   npm run build
   aws s3 sync build/ s3://your-ussd-app
   ```

3. **Configure CloudFront** for CDN and HTTPS

### **Google Cloud Platform**

1. **Install gcloud CLI**
2. **Deploy to App Engine:**
   ```bash
   gcloud app deploy app.yaml
   ```

3. **Or use Firebase Hosting:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

### **Azure Static Web Apps**

1. **Install Azure CLI**
2. **Deploy:**
   ```bash
   az staticwebapp create --name your-ussd-app --source .
   ```

## 🐳 Docker Deployment

### **Dockerfile**
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **nginx.conf**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### **Deploy with Docker:**
```bash
docker build -t ussd-menu-flow .
docker run -p 80:80 ussd-menu-flow
```

## 🔧 Environment Configuration

### **Environment Variables**
Create `.env.production`:
```env
REACT_APP_API_URL=https://your-api.com
REACT_APP_ANALYTICS_ID=your-analytics-id
REACT_APP_VERSION=$npm_package_version
```

### **Build Optimization**
```bash
# Analyze bundle size
npm install --save-dev webpack-bundle-analyzer
npm run build -- --analyze

# Optimize images
npm install --save-dev imagemin-webpack-plugin
```

## 📊 Performance Optimization

### **Pre-deployment Checklist:**
- [ ] Minify and compress assets
- [ ] Enable gzip compression
- [ ] Optimize images
- [ ] Set up CDN
- [ ] Configure caching headers
- [ ] Enable HTTPS
- [ ] Set up monitoring

### **Performance Monitoring:**
```bash
# Lighthouse audit
npm install -g lighthouse
lighthouse https://your-app.com --output html --output-path ./lighthouse-report.html
```

## 🔒 Security Considerations

### **Security Headers:**
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### **Content Security Policy:**
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

## 📈 Monitoring & Analytics

### **Set up monitoring:**
1. **Google Analytics 4**
2. **Sentry** for error tracking
3. **New Relic** for performance monitoring
4. **Uptime Robot** for availability monitoring

### **Health Check Endpoint:**
```javascript
// Add to your app
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

## 🚀 CI/CD Pipeline

### **GitHub Actions Example:**
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=build
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📱 PWA Deployment

### **Enable PWA features:**
1. Update `public/manifest.json`
2. Configure service worker
3. Test offline functionality
4. Validate PWA requirements

## 🔄 Rollback Strategy

### **Version Management:**
```bash
# Tag releases
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Rollback to previous version
git checkout v0.9.0
npm run build
# Redeploy
```

## 📞 Support

For deployment issues:
1. Check the [React deployment documentation](https://create-react-app.dev/docs/deployment/)
2. Review platform-specific guides
3. Monitor application logs
4. Test in staging environment first

---

**Remember:** Always test your deployment in a staging environment before going to production! 