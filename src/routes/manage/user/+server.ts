import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { init } from "svelte/internal";

export const POST = (async (event: Event): Promise<Response> =>{

    const response = new Response(null,{status:200, statusText:'OK', headers:{
      'Set-cookie': 'session=;HttpOnly;Path=/'
      }})
    console.log(response)
    return response;
})
export const GET = ((event) => {
  // log all headers
  console.log(...event.request.headers);
  return json({
    // retrieve a specific header
  });
}) satisfies RequestHandler;