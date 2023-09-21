import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const data = {
  count: 0,
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (url.pathname === "/visits") {
    data.count++;
    const body = `<h1>Visits: ${data.count}</h1>`;
    return new Response(body, responseDetails);
  } else if (url.pathname === "/meaning") {
    const responseText = "Seeking truths beyond meaning of life, you will find 43.";
    return new Response(responseText, responseDetails);
  }

  // Default response for other paths
  const defaultResponse = "Nothing here yet.";
  return new Response(defaultResponse, responseDetails);
};

serve(handleRequest, { port: 7777 });
