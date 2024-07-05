import { connection } from "../models/connection.mjs";

export class ModelsProcessors {

    static getAll = async ({order}) => {
        // define the allowed orders for the query
        const validOrders = {
            "RAND()": "RAND()",
            "pro.precio ASC": "pro.precio ASC",
            "pro.precio DESC": "pro.precio DESC"
        };

        // Selects valid order, defaults to 'RAND()' if invalid
        const orderBy = validOrders[order] || "RAND()";

        const [processors] = await connection.query(
            `
                SELECT BIN_TO_UUID(pro.id) AS id, pro.marca, pro.modelo, pro.numNucleos, pro.numHilos, pro.relojBase, 
                pro.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM procesadores pro INNER JOIN recursos r ON pro.recursos_id_recurso = r.id_recurso ORDER BY ${orderBy};
            `
        );

        return processors
    }

    static getById = async ({id}) => {
        const [processor] = await connection.query(
        `
            SELECT BIN_TO_UUID(pro.id) AS id, pro.marca, pro.modelo, pro.numNucleos, pro.numHilos, pro.relojBase, 
            pro.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
            
            FROM procesadores pro INNER JOIN recursos r ON pro.recursos_id_recurso = r.id_recurso WHERE pro.id = UUID_TO_BIN(?);
        `, [id]
        )

        // record was not found
        if (processor.length == 0) return false
        // record was found
        return processor
    }

    static createProcessor = async (data) => {
        // generate a uuid to give to the product
        const [[{ uuid }]] = await connection.query(`SELECT UUID() AS uuid`);
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
                INSERT INTO procesadores (id, marca, modelo, numNucleos, numHilos, relojBase, precio, recursos_id_recurso) 
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?)
                `, [uuid, data.input.marca, data.input.modelo, data.input.numNucleos, data.input.numHilos, data.input.relojBase, data.input.precio, lastId.id_recurso]
            )

            return true
        }
        catch (error) {
            return error
        }

    }
}