import { DataSource } from "typeorm"
import {DB_HOST, DB_USER,DB_PASSWORD,DB_DATABASE,DB_PORT} from '$env/static/private'
import {User} from "../Models/User";
import {Layout} from "../Models/Layout";
import {Content} from "../Models/Content";
import {to_number} from "svelte/internal";

const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: to_number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: [User,Layout,Content],
    synchronize: true,
    logging: false,
})