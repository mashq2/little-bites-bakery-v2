# Deployment Guide — Little Bites Bakery


This guide walks you through deploying your M-Pesa integrated catering site to production.

## Local Development

Start the server:
```bash
cd c:\Users\Bella\Downloads\web
npm install
node server.js
```

Visit: `http://localhost:3000`


## Production Deployment

### Option 1: Heroku (Easiest for Node.js)

1. **Install Heroku CLI** — Download from [heroku.com/cli](https://www.heroku.com/cli)

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create a new app:**
   ```bash
   heroku create luxury-catering-ke
   ```

4. **Set environment variables** for M-Pesa credentials:
   ```bash
   heroku config:set CONSUMER_KEY="your_consumer_key"
   heroku config:set CONSUMER_SECRET="your_consumer_secret"
   heroku config:set BUSINESS_SHORT_CODE="your_short_code"
   heroku config:set M_PESA_PASSWORD="John Macharia"
   heroku config:set M_PESA_TIMESTAMP="20260220120000"
   ```

5. **Update `server.js` to read from environment:**
   ```javascript
   const consumerKey = process.env.CONSUMER_KEY || "YOUR_CONSUMER_KEY";
   const businessShortCode = process.env.BUSINESS_SHORT_CODE || "174379";
   // etc.
   ```

6. **Add Procfile** (at root of project):
   ```
   web: node server.js
   ```

7. **Deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

Your site will be live at: `https://luxury-catering-ke.herokuapp.com`

---

### Option 2: Render (Free tier available)

1. **Sign up** at [render.com](https://render.com)

2. **Push code to GitHub** (create a repo at [github.com/new](https://github.com/new))

3. **In Render Dashboard:**
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Add environment variables (same as Heroku above)
   - Deploy

---

### Option 3: Azure App Service

1. **Install Azure CLI** — Download from [aka.ms/azurecli](https://aka.ms/azurecli)

2. **Create resource group:**
   ```bash
   az group create --name LuxuryCateringRG --location eastus
   ```

3. **Create App Service plan:**
   ```bash
   az appservice plan create --name LuxuryCateringPlan --resource-group LuxuryCateringRG --sku F1
   ```

4. **Create web app:**
   ```bash
   az webapp create --resource-group LuxuryCateringRG --plan LuxuryCateringPlan --name Little Bites-ke
   ```

5. **Deploy from local git:**
   ```bash
   az webapp up --resource-group LuxuryCateringRG --name Little Bites-ke --runtime "node|18"
   ```

---

## Configure M-Pesa Daraja API

### Steps:

1. **Register at** [developer.safaricom.co.ke](https://developer.safaricom.co.ke)

2. **Create an App:**
   - Choose "Customer to Business (C2B)" or "B2B" type
   - Get your credentials:
     - **Consumer Key**
     - **Consumer Secret**
     - **Business Short Code** (paybill or till)

3. **Generate OAuth Token:**
   - Use Consumer Key + Secret to call:
     ```
     GET https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials
     ```

4. **Update `server.js`:**
   ```javascript
   const token = process.env.BEARER_TOKEN; // Your OAuth token
   const businessShortCode = process.env.BUSINESS_SHORT_CODE;
   ```

5. **Test the endpoint:**
   ```bash
   curl -X POST https://luxury-catering-ke.herokuapp.com/pay \
     -H "Content-Type: application/json" \
     -d '{"phone":"254712345678"}'
   ```

---

## Update WhatsApp Booking Link

In `script.js`, replace the WhatsApp number:

```javascript
// Line 10 (approximately)
return `https://wa.me/254742459447?text=${msg}`;
// Change to:
return `https://wa.me/254742459447?text=${msg}`;
```



## SSL/HTTPS Setup

M-Pesa requires **secure HTTPS** endpoints.

- **Heroku, Render, Azure** provide free HTTPS
- **Custom domain?** Use [Cloudflare](https://www.cloudflare.com) (free DDoS protection + SSL)

---

## Monitoring & Logging

Check server logs in production:

**Heroku:**
```bash
heroku logs --tail
```

**Render:**
- Dashboard → Logs tab

**Azure:**
- Azure Portal → Diagnostic logs

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| `Invalid Access Token` | Regenerate OAuth token; check Consumer Key/Secret |
| `404.001.03` | Token expired; refresh from Daraja API |
| `Port already in use` | Change port in `server.js`: `const PORT = process.env.PORT \|\| 5000;` |
| CORS errors | Add CORS middleware to `server.js` |

---

## Next Steps

1. ✅ Get Daraja API credentials
2. ✅ Choose hosting (Heroku recommended for quick start)
3. ✅ Set environment variables
4. ✅ Deploy and test payment flow
5. ✅ Monitor logs and errors

**Need help?** Reference the Safaricom Daraja docs: [developer.safaricom.co.ke/docs](https://developer.safaricom.co.ke/docs)
