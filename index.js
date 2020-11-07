const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = process.env.PORT || 3000;
// app.use(cors());
var whitelist = [
  "http://localhost",
  "localhost:3000",
  "https://listening.netlify.app",
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(
  "/identity/token",
  createProxyMiddleware({
    target: "https://identity-1.eu-central.iam.cloud.ibm.com",
    changeOrigin: true,
  })
);
app.listen(PORT);
