
import {DB_HOST, DB_USER,DB_PASSWORD,DB_PORT} from '$env/static/private'
import mysql from "mysql2/promise"
import {to_number} from "svelte/internal";
export const client = await mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    port:to_number(DB_PORT)
})

export async function start_mysql() {
    console.log("Starting MYSQL...");

    return client.connect();
};

export default client;
