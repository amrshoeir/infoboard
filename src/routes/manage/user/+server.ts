import type { Actions } from "@sveltejs/kit";

export const POST = (async (event: Event): Promise<Response> =>{
  const response = new Response(null, {
      status: 200, statusText: 'OK', headers: {
        'Set-cookie': ['session=;HttpOnly;Path=/;expires=Thu, Jan 01 1970 00:00:00 UTC',
          'user=;HttpOnly;Path=/;expires= Thu, Jan 01 1970 00:00:00 UTC']
      } as any
})
    return response;
})
export const actions= {
  route: async({request})=>{
    const data = await request.formData();
    console.log(data);
    return 'hi';
  },

}satisfies Actions