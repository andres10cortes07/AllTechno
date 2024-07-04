import { connection } from "./connection.mjs";

export class ModelsDesktops {

    static getAll = async ({order}) => {
        const validOrders = {
            "RAND()": "RAND()",
            "tor.precio ASC": "tor.precio ASC",
            "tor.precio DESC": "tor.precio DESC"
        }

        const orderBy = validOrders[order] || "RAND()"

        const [desktopPcs] = await connection.query(
            `
                SELECT BIN_TO_UUID(tor.id) AS id, tor.procesador, tor.grafica, tor.ram, tor.almacenamiento, tor.board, 
                tor.chasis, tor.fuente, tor.refrigeracion, tor.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM torreescritorio tor INNER JOIN recursos r ON tor.recursos_id_recurso = r.id_recurso ORDER BY ${orderBy};
            `
        )

        return desktopPcs
    }

    static getById = async ({id}) => {
        const [desktopPc] = await connection.query(
            `
                SELECT BIN_TO_UUID(tor.id) AS id, tor.procesador, tor.grafica, tor.ram, tor.almacenamiento, tor.board, 
                tor.chasis, tor.fuente, tor.refrigeracion, tor.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM torreescritorio tor INNER JOIN recursos r ON tor.recursos_id_recurso = r.id_recurso WHERE tor.id = UUID_TO_BIN(?);
            `, [id]
        )

        if (desktopPc.length == 0) return false
        return desktopPc
    }

    static createDesktopPc = async (data) => {
        const [[{uuid}]] = await connection.query(`SELECT UUID() AS uuid`);
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
                INSERT INTO torreescritorio (id, procesador, grafica, ram, almacenamiento, 
                board, chasis, fuente, refrigeracion, precio, recursos_id_recurso)

                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [uuid, data.input.procesador, data.input.grafica, data.input.ram, data.input.almacenamiento, 
                    data.input.board, data.input.chasis, data.input.fuente, data.input.refrigeracion, data.input.precio, lastId.id_recurso]
                )
                
                return true
            }
            catch (error){
                return {error : error}
            }
        }
    }
}