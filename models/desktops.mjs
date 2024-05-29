import { connection } from "./connection.mjs";

export class ModelsDesktops {

    static getAll = async () => {
        const [desktopPcs] = await connection.query(
            `
                SELECT BIN_TO_UUID(tor.id) AS id, tor.procesador, tor.grafica, tor.ram, tor.almacenamiento, tor.board, 
                tor.chasis, tor.fuente, tor.refrigeracion, tor.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM torreescritorio tor INNER JOIN recursos r ON tor.recursos_id_recurso = r.id_recurso ;
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

}