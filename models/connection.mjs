import mysql from "mysql2/promise"

const config = {
    host: "localhost",
    password: "admin",
    user: "root",
    port: 3350,
    bd: "alltechno"
}

export const connection = await mysql.createConnection(config);
connection.query(`USE ${config.bd}`);