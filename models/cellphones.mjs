import { connection } from "./connection.mjs";

export class cellphoneModels {
    static getAll = async () => {
        const [cellphones] = await connection.query(
            `SELECT BIN_TO_UUID(id) AS id, 
            marca,
            modelo,
            bateria,
            procesador,
            camaraFrontal,
            camaraPosterior,
            resolucion,
            huella,
            almacenamiento,
            ram,
            precio,
            colores,
            recursos_id_recurso
            FROM celulares;`
        )
        return cellphones
    }
}