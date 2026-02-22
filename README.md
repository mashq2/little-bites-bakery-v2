# Luxury Catering KE — Demo Website

A premium catering site with integrated M-Pesa payment processing via Safaricom's Daraja API.

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

3. Open `http://localhost:3000` in your browser.

## M-Pesa Integration Setup

To enable real M-Pesa payments, add your Safaricom Daraja API credentials to `server.js`:

1. Register at [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create an application (choose "Customer to Business (C2B)" or "B2B" type)
3. In `server.js`, replace these placeholders:

```javascript
const consumerKey = "YOUR_CONSUMER_KEY";        // From app settings
const consumerSecret = "YOUR_CONSUMER_SECRET";  // From app settings
const businessShortCode = "YOUR_SHORT_CODE";    // Till or Paybill number
const passkey = "YOUR_PASSKEY";                 // Lipa na M-Pesa Online passkey
```

4. In the `/pay` endpoint, uncomment and complete the STK push request to send prompts to user phones.

## Features

- ✅ Responsive design (mobile-first)
- ✅ ARIA accessibility labels
- ✅ WhatsApp booking integration
- ✅ M-Pesa OAuth token generation (Daraja API)
- ✅ Payment request handling

## Project Structure

- `index.html` — Page markup
- `styles.css` — Styling and layout
- `script.js` — Client-side interactions
- `server.js` — Express backend + M-Pesa integration
- `package.json` — Dependencies and scripts

## Notes

- The M-Pesa OAuth flow uses Safaricom's **sandbox** endpoint by default
- For production, change `sandbox.safaricom.co.ke` to the live endpoint
- Cache the OAuth token in production to reduce API calls

Want help deploying or customizing further?

