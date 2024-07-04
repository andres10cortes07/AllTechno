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

    static createRam = async (data) => {
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
                INSERT INTO ram (id, marca, modelo, capacidad, velocidad, tipo, led, precio, recursos_id_recurso) 
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?)
                `, [uuid, data.input.marca, data.input.modelo, data.input.capacidad, data.input.velocidad, 
                    data.input.tipo, data.input.led, data.input.precio, lastId.id_recurso]
                )
                
                return true
            }
            catch (error){
                return {error : error.code}
            }
        }
    }
}