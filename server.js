const http = require("http");
const path = require("path");


const hostname = "127.0.0.1";
const port = 1337;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader = ("Content-Type", "text/plain");
  res.end(`serving from ${__dirname}`);
});

server.listen(port, hostname, () => {
  console.log(`Server has mounted @ ${hostname}:${port}`);
});
