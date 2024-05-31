import { connection } from "./connection.mjs";

export class ModelsPowerSupplies {

    static getAll = async ({order}) => {
        // Define las órdenes permitidas
        const validOrders = {
            "RAND()": "RAND()",
            "pow.precio ASC": "pow.precio ASC",
            "pow.precio DESC": "pow.precio DESC"
        };

        // Selecciona el orden válido, por defecto a 'RAND()' si no es válido
        const orderBy = validOrders[order] || "RAND()";

        const [powerSupplies] = await connection.query(
            `
            SELECT BIN_TO_UUID(pow.id) AS id, pow.marca, pow.modelo, pow.voltaje, pow.potencia, pow.certificacion, 
            pow.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
            
            FROM fuentesdepoder pow INNER JOIN recursos r ON pow.recursos_id_recurso = r.id_recurso ORDER BY ${orderBy};
            `
        );

        return powerSupplies
    }

    static getById = async ({id}) => {
        const [powerSupply] = await connection.query(
            `
                SELECT BIN_TO_UUID(pow.id) AS id, pow.marca, pow.modelo, pow.voltaje, pow.potencia, pow.certificacion, 
                pow.precio, r.url1, r.url2, r.url3, r.url4, r.url5, r.url6 
                
                FROM fuentesdepoder pow INNER JOIN recursos r ON pow.recursos_id_recurso = r.id_recurso WHERE pow.id = UUID_TO_BIN(?)
            `, [id]
        )
        if(powerSupply.length == 0) return false
        return powerSupply
    }
}