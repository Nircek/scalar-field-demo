# Deployment Guide

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Vite build system"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

3. **The GitHub Actions workflow will automatically:**
   - Build your project (`npm run build`)
   - Deploy to GitHub Pages
   - Your site will be available at: `https://your-username.github.io/scalar-field-demo/`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder**
   - Upload contents of `dist/` to your hosting provider
   - Or use GitHub Pages with the `dist/` folder as source

## Other Platforms

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Vercel will automatically detect Vite and configure the build

### Custom Server
1. Build: `npm run build`
2. Serve the `dist/` folder with any static file server

## Environment Variables

For different deployment environments, you can create:
- `.env.development` - Development settings
- `.env.production` - Production settings

## Build Optimization

The Vite build process:
- ✅ Minifies JavaScript and CSS
- ✅ Adds cache-busting hashes to filenames
- ✅ Generates source maps for debugging
- ✅ Optimizes asset loading

## Troubleshooting

### Build Issues
- Ensure all dependencies are installed: `npm install`
- Check for syntax errors in your JavaScript files
- Verify all import paths are correct

### Deployment Issues
- Check that the `dist/` folder contains all necessary files
- Verify GitHub Actions workflow is running successfully
- Ensure repository permissions allow GitHub Pages deployment

## Performance Tips

- The built files are optimized for production
- Consider adding a CDN for faster global delivery
- Monitor Core Web Vitals in production 