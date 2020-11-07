const http = require("http");
var querystring = require("querystring");

let token;

function generateToken(url, path = "/", port = 80, apiKey, callback) {
  let response = [];
  if (url && apiKey && callback) {
    if (typeof url == !"string") throw "url must be a string";
    if (typeof apiKey == !"string") throw "apiKey must be a string";
    if (typeof port == !"number") throw "port must be a number";
    if (typeof url == !"string") throw "url must be a string";
    if (typeof path == !"string") throw "path must be a string";
    if (typeof callback == !"function") throw "callback must be a function";

    const data = querystring.stringify({
      grant_type: "urn:ibm:params:oauth:grant-type:apikey",
      apikey: apiKey,
    });

    const options = {
      hostname: url,
      path: path,
      port: port,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        "Content-Length": Buffer.byteLength(data),
      },
    };

    const req = http.request(options, (res) => {
      res.on("data", (chunk) => {
        response.push(chunk);
      });

      res.on("end", () => {
        const buffer = Buffer.concat(response);
        const bufferToJson = JSON.parse(buffer);
        token = bufferToJson.access_token;
        callback(token);
      });
    });

    req.on("error", (error) => {
      throw error;
    });

    req.write(data);
    req.end();
  } // end if
  else {
    throw "url or apiKey or callback cannot be empty";
  }
}

module.exports = generateToken;
