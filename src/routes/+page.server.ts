import type { PageServerLoad } from "../../.svelte-kit/types/src/routes/manage/$types";
import db from "../database/orm/Operations";

export const load = (async ({ cookies }) => {

  const content = await db.getAll('content');

  return {
    content
  };
}) satisfies PageServerLoad;