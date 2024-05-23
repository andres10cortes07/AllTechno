import { connection } from "./connection.mjs";

export class laptopModels {
    static getAll = async () => {
        const [laptops] = await connection.query(
        `
            SELECT BIN_TO_UUID(por.id) AS id, por.marca, por.modelo, por.procesador, por.grafica, por.resolucion, 
            por.tamañoPantalla, por.almacenamiento, por.ram, por.almacenamiento, por.ram, por.precio, por.colores, 
            r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
            
            FROM portatiles por INNER JOIN recursos r ON por.recursos_id_recurso = r.id_recurso ;
        `);
        return laptops
    }

    static getById = async ({ id }) => {
        const [laptop] = await connection.query(
        `
            SELECT BIN_TO_UUID(id) AS id, marca, modelo, procesador, grafica,resolucion, 
            tamañoPantalla, almacenamiento, ram, almacenamiento, ram, precio, colores FROM portatiles WHERE id = UUID_TO_BIN(?);
        `, [id]);

        if (laptop.length == 0) return false
        return laptop
    }
}