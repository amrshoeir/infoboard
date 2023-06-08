import { start_mysql } from "$database/db"
import db from "$database/orm/dbInitialize";
import type { Handle } from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";

const unprotectedRoutes: string[]=[
    '/',
    '/manage'
];
export const handle:Handle = (async ({ event,resolve }):Promise<Response> => {
    const session = event.cookies.get('session');
    if ((!session || session == 'inactive') && !unprotectedRoutes.includes(event.url.pathname))
        throw redirect(303, '/manage');
    if(event.url.pathname=='/manage' && (session != 'inactive' && session)){
        throw redirect (303,'/')
    }
    return resolve(event)
})
start_mysql().then(async ()=>{
    console.log("MYSQL Connected");
    console.log("Initializing DB..");
    await db.initializeDB();
    if(await db.checkIfExists('user')){
        await db.updateAdmin();
        console.log('admin updated');
    }else{
        console.log("DB Initialized. Creating tables..");
        await db.initializeTables();
        console.log("Tables created. :) you're good to go.")
    }
});


