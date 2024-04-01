import type { PageServerLoad } from "../../../../../.svelte-kit/types/src/routes/manage/user/[username]/$types";
import db from "$database/orm/Operations";

export const load:PageServerLoad = async ({params}) =>{
  return {
    user:await db.getOne('user',await db.getIdByKey('user','username',params.username))
  }
}