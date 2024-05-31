import { connection } from "../models/connection.mjs";

export class ModelsScreens {

    static getAll = async ({order}) => {
        // Define las órdenes permitidas
        const validOrders = {
            "RAND()": "RAND()",
            "pan.precio ASC": "pan.precio ASC",
            "pan.precio DESC": "pan.precio DESC"
        };

        // Selecciona el orden válido, por defecto a 'RAND()' si no es válido
        const orderBy = validOrders[order] || "RAND()";

        const [screens] = await connection.query(
            `
                SELECT BIN_TO_UUID(pan.id) AS id, pan.marca, pan.modelo, pan.dimensiones, pan.pulgadas, pan.resolucion, 
                pan.tipo, pan.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM pantallas pan INNER JOIN recursos r ON pan.recursos_id_recurso = r.id_recurso ORDER BY ${orderBy};
            `
        )

        return screens
    }

    static getById = async ({id}) => {
        const [screen] = await connection.query(
            `
                SELECT BIN_TO_UUID(pan.id) AS id, pan.marca, pan.modelo, pan.dimensiones, pan.pulgadas, pan.resolucion, 
                pan.tipo, pan.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM pantallas pan INNER JOIN recursos r ON pan.recursos_id_recurso = r.id_recurso WHERE pan.id = UUID_TO_BIN(?)
            `, [id]
        )

        if (screen.length == 0) return false
        return screen
    }

}