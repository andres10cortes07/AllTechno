import { connection } from "../models/connection.mjs";

export class ModelsScreens {

    static getAll = async ({order}) => {
        // define the allowed orders for the query
        const validOrders = {
            "RAND()": "RAND()",
            "pan.precio ASC": "pan.precio ASC",
            "pan.precio DESC": "pan.precio DESC"
        };

        // Selects valid order, defaults to 'RAND()' if invalid
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

        // record was not found
        if (screen.length == 0) return false
        // record was found
        return screen
    }

    static createScreen = async (data) => {
        // generate a uuid to give to the product
        const [[{ uuid }]] = await connection.query(`SELECT UUID() AS uuid;`);
        const urlImg = data.input.imagenes

        try {
            await connection.query(
                `
                        INSERT INTO recursos (url1, url2, url3, url4, url5, url6) VALUES (?, ?, ?, ?, ?, ?);
                    `, [urlImg[0], urlImg[1], urlImg[2], urlImg[3], urlImg[4], urlImg[5]]
            )

            // access the last record created in resources
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
        catch (error) {
            return error
        }

    }

    static modifyScreen = async () => {

    }

    static deleteScreen = async ({ id }) => {
        const [deleteStatus] = await connection.query(
            `DELETE FROM pantallas WHERE id = UUID_TO_BIN(?);` , [id]
        )

        if (deleteStatus.affectedRows == 1) return true
        return false
    }

}