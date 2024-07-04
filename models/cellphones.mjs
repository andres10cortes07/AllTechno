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

    static createCellphone = async (data) => {
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
                INSERT INTO celulares (id, marca, modelo, bateria, procesador, camaraFrontal, camaraPosterior, resolucion, huella, almacenamiento, ram, precio, colores, recursos_id_recurso) 
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [uuid, data.input.marca, data.input.modelo, data.input.bateria, data.input.procesador, data.input.camaraFrontal, data.input.camaraPosterior, 
                    data.input.resolucion, data.input.huella, data.input.almacenamiento, data.input.ram, data.input.precio, data.input.colores, lastId.id_recurso]
                )
        
                return true
            }
            catch (error){
                return {error : error.code}
            }
        }
    }
}