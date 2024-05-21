import { connection } from "./connection.mjs";

export class cellphoneModels {
    static getAll = async () => {
        const [cellphones] = await connection.query(
            `SELECT BIN_TO_UUID(cel.id) AS id, 
            cel.marca, cel.modelo, cel.bateria, cel.procesador, cel.camaraFrontal, 
            cel.camaraPosterior, cel.resolucion, cel.huella, 
            cel.almacenamiento, cel.ram, cel.precio, cel.colores, 
            r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
            
            FROM celulares cel INNER JOIN recursos r 
            ON cel.recursos_id_recurso = r.id_recurso ;`
        )
        return cellphones
    }
}