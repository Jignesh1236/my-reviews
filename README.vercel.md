
# Deploying Client to Vercel

## Steps:

1. **Deploy your backend on Replit** (it's already running here)
   - Click "Release" → "Deploy" to get a permanent URL like `https://your-app.replit.app`

2. **Push your code to GitHub** (if not already done)

3. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Configure the project:
     - **Framework Preset**: Vite
     - **Root Directory**: `./` (leave as default)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist/public`

4. **Add Environment Variable in Vercel:**
   - In Vercel project settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-repl-name.replit.app`
   - Replace with your actual Replit deployment URL

5. **Update CORS on Replit backend** to allow Vercel domain (see below)

## Important: Update CORS Settings

Your backend needs to allow requests from Vercel. Add this after I create the CORS configuration.
