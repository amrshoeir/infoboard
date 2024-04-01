import type { PageServerLoad } from "../../.svelte-kit/types/src/routes/manage/$types";
import db from "../database/orm/Operations";

export const load = (async (event) => {
  const content = await db.getAll('content');
  const layout = await db.getAll('layout');
  event.locals ={content,layout}
  return {
    content,
    layout
  };
}) satisfies PageServerLoad;