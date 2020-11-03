const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(
  "/identity/token",
  createProxyMiddleware({
    target: "https://identity-1.eu-central.iam.cloud.ibm.com",
    changeOrigin: true,
  })
);
app.listen(PORT);
