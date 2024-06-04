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


        const [cellphones] = await connection.query(`
            SELECT BIN_TO_UUID(cel.id) AS id, 
            cel.marca, cel.modelo, cel.bateria, cel.procesador, cel.camaraFrontal, 
            cel.camaraPosterior, cel.resolucion, cel.huella, 
            cel.almacenamiento, cel.ram, cel.precio, cel.colores, 
            r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
            FROM celulares cel 
            INNER JOIN recursos r ON cel.recursos_id_recurso = r.id_recurso 
            ORDER BY ${orderBy};
        `);
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

    static createCellphone = async (input) => {
        const [[{ uuid }]] = await connection.query(`SELECT UUID() AS uuid;`);

        await connection.query(
        `
        INSERT INTO celulares (id, marca, modelo, bateria, procesador, camaraFrontal, camaraPosterior, resolucion, huella, almacenamiento, ram, precio, colores, recursos_id_recurso) 
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
        `, [uuid, input.marca, input.modelo, input.bateria, input.procesador, input.camaraFrontal, input.camaraPosterior, 
            input.resolucion, input.huella, input.almacenamiento, input.ram, input.precio, input.colores]
        )

        const [newCellphone] = await connection.query(
            `
                SELECT BIN_TO_UUID(id) as id, marca, modelo, bateria, procesador, camaraFrontal, camaraPosterior, resolucion, huella, almacenamiento, ram, precio, colores
                FROM celulares 
                WHERE id = UUID_TO_BIN(?)
            `, [uuid]
        )

        if (newCellphone.length == 0) return false
        return newCellphone[0]
    }
}