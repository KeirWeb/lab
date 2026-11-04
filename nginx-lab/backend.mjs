import { createServer } from "node:http";

const server = createServer((req, res) => {
  const path = new URL(req.url, "http://backend.local").pathname;

  if (req.method === "GET" && path === "/health") {
    console.log("health check");
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("ok\n");
    return;
  }

  if (req.method !== "GET" || path !== "/") {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`not found ${req.method} ${path}\n`);
    return;
  }

  const body = [
    "backend ok",
    `path=${req.url}`,
    `host=${req.headers.host}`,
    `port=${port}`,
    `headers=${JSON.stringify(req.headers)}`,
    "",
  ].join("\n");

  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  console.log("backend ok");

  res.end(body);
});

const port = Number(process.env.PORT ?? 3000);

server.listen(port, "0.0.0.0", () => {
  console.log(`backend on http://127.0.0.1:${port}`);
});
