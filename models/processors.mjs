import { connection } from "../models/connection.mjs";

export class ModelsProcessors {

    static getAll = async ({order}) => {
        // Define las órdenes permitidas
        const validOrders = {
            "RAND()": "RAND()",
            "pro.precio ASC": "pro.precio ASC",
            "pro.precio DESC": "pro.precio DESC"
        };

        // Selecciona el orden válido, por defecto a 'RAND()' si no es válido
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

        if (processor.length == 0) return false
        return processor
    }

    static createProcessor = async (input) => {
        const [[{uuid}]] = await connection.query(`SELECT UUID() AS uuid`);

        await connection.query(
            `
                INSERT INTO procesadores (id, marca, modelo, numNucleos, numHilos, relojBase, precio, recursos_id_recurso)
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, NULL);
            `, [uuid, input.marca, input.modelo, input.numNucleos, input.numHilos, input.relojBase, input.precio]
        )

        const [newProcessor] = await connection.query(
            `
                SELECT BIN_TO_UUID(id) AS id, marca, modelo, numNucleos, numHilos, relojBase, precio
                FROM procesadores WHERE id = UUID_TO_BIN(?)
            `, [uuid]
        )

        if (newProcessor.length == 0) return false
        return newProcessor[0]
    }
}