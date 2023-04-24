import { start_mysql } from "../src/database/db"
import type {Handle} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";

const unprotectedRoutes: string[]=[
    '/',
    '/manage'
];
// export const handle:Handle = (async ({ event,resolve }) => {
//     const session = event.cookies.get('session');
//     if (!session && !unprotectedRoutes.includes(event.url.pathname))
//         return redirect(304, '/manage');
//     return resolve(event)
// })

start_mysql().then(()=>{
    console.log("MYSQL Connected");
});


