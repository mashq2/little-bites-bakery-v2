const express = require("express");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Ensure images folder exists
fs.mkdirSync(path.join(__dirname, "images"), { recursive: true });

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "images"));
  },
  filename: function (req, file, cb) {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, safeName);
  }
});
const upload = multer({ storage });

// M-Pesa credentials (use environment variables in production)
const BEARER_TOKEN = process.env.M_PESA_TOKEN || "YOUR_BEARER_TOKEN";
const BUSINESS_SHORT_CODE = process.env.BUSINESS_SHORT_CODE || "business_short_code";
const M_PESA_PASSWORD = process.env.M_PESA_PASSWORD || "YOUR_PASSWORD";
const M_PESA_TIMESTAMP = process.env.M_PESA_TIMESTAMP || "20260220120000";
const CALLBACK_URL = process.env.CALLBACK_URL || "https://yourdomain.com/callback";

app.post("/pay", async (req, res) => {
  const phone = req.body.phone;

  console.log(`\n[${new Date().toISOString()}] Payment Request Received`);
  console.log(`Phone: ${phone}`);

  try {
    console.log("Sending STK push to Daraja API...");
    
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: BUSINESS_SHORT_CODE,
        Password: M_PESA_PASSWORD,
        Timestamp: M_PESA_TIMESTAMP,
        TransactionType: "CustomerPayBillOnline",
        Amount: "10",
        PartyA: phone,
        PartyB: BUSINESS_SHORT_CODE,
        PhoneNumber: phone,
        CallBackURL: CALLBACK_URL,
        AccountReference: "Little Bites BakeryShop",
        TransactionDesc: "Booking Payment"
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`
        }
      }
    );

    console.log("[SUCCESS] STK Push Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.log("[ERROR] STK Push Failed:");
    console.log(`Message: ${error.message}`);
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Data:`, error.response.data);
    }
    res.json({ error: error.message });
  }
});


