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
    // Increment the visit count
    data.count++;

    // Render the HTML page with the visit count
    return new Response(await renderFile("visits.eta", data), responseDetails);
  } else if (url.pathname === "/meaning") {
    // Respond with the meaning of life
    return new Response("Seeking truths beyond meaning of life, you will find 43.");
  } else {
    // Respond with "Nothing here yet." for other paths
    return new Response("Nothing here yet.");
  }
};

serve(handleRequest, { port: 7777 });
