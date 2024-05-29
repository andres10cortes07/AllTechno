import { connection } from "../models/connection.mjs";

export class ModelsProcessors {
    static getAll = async () => {
        const [processors] = await connection.query(
            `
                SELECT BIN_TO_UUID(pro.id) AS id, pro.marca, pro.modelo, pro.numNucleos, pro.numHilos, pro.relojBase, 
                pro.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM procesadores pro INNER JOIN recursos r ON pro.recursos_id_recurso = r.id_recurso ORDER BY RAND();
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
}