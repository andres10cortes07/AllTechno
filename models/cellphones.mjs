import { connection } from "./connection.mjs";

export class cellphoneModels {
    
    static getAll = async ({ order }) => {
        // Define las órdenes permitidas
        const validOrders = {
            "RAND()": "RAND()",
            "cel.precio ASC": "cel.precio ASC",
            "cel.precio DESC": "cel.precio DESC"
        };

        // Selecciona el orden válido, por defecto a 'RAND()' si no es válido
        const orderBy = validOrders[order] || "RAND()";

        const query = `
            SELECT BIN_TO_UUID(cel.id) AS id, 
            cel.marca, cel.modelo, cel.bateria, cel.procesador, cel.camaraFrontal, 
            cel.camaraPosterior, cel.resolucion, cel.huella, 
            cel.almacenamiento, cel.ram, cel.precio, cel.colores, 
            r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
            FROM celulares cel 
            INNER JOIN recursos r ON cel.recursos_id_recurso = r.id_recurso 
            ORDER BY ${orderBy};
        `;

        const [cellphones] = await connection.query(query);
        return cellphones;
    }

    static getById = async ({ id }) => {
        const [cellphone] = await connection.query(
            `
            SELECT BIN_TO_UUID(cel.id) AS id, 
            cel.marca, cel.modelo, cel.bateria, cel.procesador, cel.camaraFrontal, 
            cel.camaraPosterior, cel.resolucion, cel.huella, 
            cel.almacenamiento, cel.ram, cel.precio, cel.colores, 
            r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
            
            FROM celulares cel INNER JOIN recursos r 
            ON cel.recursos_id_recurso = r.id_recurso

            WHERE cel.id = UUID_TO_BIN(?);
            `, [id]);

        if (cellphone.length == 0) return false
        return cellphone
    }
}