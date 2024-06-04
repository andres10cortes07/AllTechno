import { connection } from "../models/connection.mjs";

export class ModelsRam {

    static getAll = async ({order}) => {
        // Define las órdenes permitidas
        const validOrders = {
            "RAND()": "RAND()",
            "ram.precio ASC": "ram.precio ASC",
            "ram.precio DESC": "ram.precio DESC"
        };

        // Selecciona el orden válido, por defecto a 'RAND()' si no es válido
        const orderBy = validOrders[order] || "RAND()";

        const [ram] = await connection.query(
            `
                SELECT BIN_TO_UUID(ram.id) AS id, ram.marca, ram.modelo, ram.capacidad, ram.velocidad, ram.tipo, 
                ram.led, ram.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM ram INNER JOIN recursos r ON ram.recursos_id_recurso = r.id_recurso ORDER BY ${orderBy};
            `
        )

        return ram
    }

    static getById = async ({id}) => {
        const [ram] = await connection.query(
            `
                SELECT BIN_TO_UUID(ram.id) AS id, ram.marca, ram.modelo, ram.capacidad, ram.velocidad, ram.tipo, 
                ram.led, ram.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM ram INNER JOIN recursos r ON ram.recursos_id_recurso = r.id_recurso WHERE ram.id = UUID_TO_BIN(?);
            `, [id]
        )

        if (ram.length == 0) return false
        return ram
    }

    static createRam = async (input) => {
        const [[{ uuid }]] = await connection.query(`SELECT UUID() AS uuid;`);

        await connection.query(
            `
            INSERT INTO ram (id, marca, modelo, capacidad, velocidad, tipo, led, precio, recursos_id_recurso) 
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, NULL)
            `, [uuid, input.marca, input.modelo, input.capacidad, input.velocidad, input.tipo, input.led, input.precio]
        )

        const [newRam] = await connection.query(
            `
                SELECT BIN_TO_UUID(id) as id, marca, modelo, capacidad, velocidad, tipo, led, precio
                FROM ram 
                WHERE id = UUID_TO_BIN(?)
            `, [uuid]
        )

        if (newRam.length == 0) return false
        return newRam[0]
    }
}