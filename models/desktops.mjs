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

    static createDesktopPc = async (input) => {
        const [[{uuid}]] = await connection.query(`SELECT UUID() AS uuid`);

        await connection.query(
            `
                INSERT INTO torreescritorio (id, procesador, grafica, ram, almacenamiento, board, chasis, fuente, refrigeracion, precio, recursos_id_recurso)
                VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL);
            `, [uuid, input.procesador, input.grafica, input.ram, input.almacenamiento, input.board, input.chasis, input.fuente, input.refrigeracion, input.precio]
        )

        const [newDesktopPc] = await connection.query(
            `
                SELECT BIN_TO_UUID(id) AS id, procesador, grafica, ram, almacenamiento, board, chasis, fuente, refrigeracion, precio
                FROM torreescritorio WHERE id = UUID_TO_BIN(?)
            `, [uuid]
        )

        if (newDesktopPc.length == 0) return false
        return newDesktopPc[0]
    }
}