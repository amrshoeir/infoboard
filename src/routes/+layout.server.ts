import type { LayoutServerLoad } from "../../.svelte-kit/types/src/routes/$types";


export const load = (async ({cookies}) => {
  const user = await cookies.get('user')
  const role = await cookies.get('session')
  return {
    user,
    role
  };
})satisfies LayoutServerLoad