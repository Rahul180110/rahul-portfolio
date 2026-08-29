// Vercel Node.js serverless function — adapts TanStack Start's Web fetch handler to Vercel's (req, res) API
import { createServer } from "node:http";
import { Readable } from "node:stream";

let handler;
async function getHandler() {
  if (!handler) {
    const mod = await import("../dist/server/server.js");
    handler = mod.default;
  }
  return handler;
}

/** Convert a Node IncomingMessage to a Web Request */
async function nodeReqToWebRequest(req) {
  const url = `https://${req.headers.host}${req.url}`;
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }
  const method = req.method ?? "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  let body = undefined;
  if (hasBody) {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    body = Buffer.concat(chunks);
  }

  return new Request(url, { method, headers, body });
}

export default async function vercelHandler(req, res) {
  try {
    const ssrHandler = await getHandler();
    const webRequest = await nodeReqToWebRequest(req);
    const webResponse = await ssrHandler.fetch(webRequest, process.env, {});

    res.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = await webResponse.arrayBuffer();
    res.end(Buffer.from(body));
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
