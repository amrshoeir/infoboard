import db from "$database/orm/Operations";
import { to_number } from "svelte/internal";
import type { PageServerLoad } from "../../../../../../.svelte-kit/types/src/routes/manage/content/layout/[id]/$types";

export const load = ( async({params})=>{
  return{
    layout:await db.getOne('layout',to_number(params.id))
  }
})satisfies PageServerLoad