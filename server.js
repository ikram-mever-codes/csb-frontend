const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const NODE_ENV = "production";

const dev = NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
  });
});
