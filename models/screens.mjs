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

    static createScreen = async (data) => {
        const [[{ uuid }]] = await connection.query(`SELECT UUID() AS uuid;`);
        const urlImg = data.input.imagenes

        const [existingImages] = await connection.query(
            `
            SELECT id_recurso FROM recursos 
            WHERE url1 LIKE ? OR
                  url2 LIKE ? OR
                  url3 LIKE ? OR
                  url4 LIKE ? OR
                  url5 LIKE ? OR
                  url6 LIKE ?;
            `, 
            [`%${data.originalNames[0]}%`, `%${data.originalNames[1]}%`, `%${data.originalNames[2]}%`, `%${data.originalNames[3]}%`, `%${data.originalNames[4]}%`, `%${data.originalNames[5]}%`]
        );
    
        if (existingImages.length > 0) {
            return {error : 'ER_DUP_ENTRY'};
        }
        else {
            try {
                await connection.query(
                    `
                        INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES (?, ?, ?, ?, ?, ?);
                    `, [urlImg[0], urlImg[1], urlImg[2], urlImg[3], urlImg[4], urlImg[5]]
                )
        
                const [[lastId]] = await connection.query(`SELECT id_recurso FROM recursos ORDER BY id_recurso DESC LIMIT 1;`)
        
                await connection.query(
                `
                INSERT INTO pantallas (id, marca, modelo, dimensiones, pulgadas, resolucion, tipo, precio, recursos_id_recurso)
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?)
                `, [uuid, data.input.marca, data.input.modelo, data.input.dimensiones, data.input.pulgadas, 
                    data.input.resolucion, data.input.tipo, data.input.precio, lastId.id_recurso]
                )
                
                return true
            }
            catch (error){
                return {error : error.code}
            }
        }
    }

}