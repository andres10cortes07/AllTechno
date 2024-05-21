import { connection } from "./connection.mjs";

export class laptopModels {
    static getAll = async () => {
        const [laptops] = await connection.query(
            //! para la consulta bien hecha debo realizar el BIN_TO_UUID, ademas de la consulta con la tabla recursos
        `
            SELECT * FROM portatiles
        `);
        return laptops
    }
}