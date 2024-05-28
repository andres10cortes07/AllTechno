import { connection } from "../models/connection.mjs";

export class ModelsRam {

    static getAll = async () => {
        const [ram] = await connection.query(
            `
                SELECT BIN_TO_UUID(ram.id) AS id, ram.marca, ram.modelo, ram.capacidad, ram.velocidad, ram.tipo, 
                ram.led, ram.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM ram INNER JOIN recursos r ON ram.recursos_id_recurso = r.id_recurso ;
            `
        )

        return ram
    }

}