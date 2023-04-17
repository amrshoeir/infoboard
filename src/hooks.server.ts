import { start_mysql } from "../src/database/db"


start_mysql().then(()=>{
    console.log("MYSQL Connected");
});


