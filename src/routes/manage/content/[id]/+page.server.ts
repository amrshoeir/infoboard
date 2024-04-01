import type { PageServerLoad } from "../../../../../.svelte-kit/types/src/routes/manage/content/[id]/$types";
import db from "$database/orm/Operations";
import { to_number } from "svelte/internal";

export const load:PageServerLoad = async ({params}) =>{
  return {
    content:await db.getOne('content',to_number(params.id))
  }
}