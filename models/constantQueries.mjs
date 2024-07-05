import { connection } from "./connection.mjs";

export class QueriesUsed {

    static verifyRepeatedImages = async (originalNames) => {
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
            [`%${originalNames[0]}%`, `%${originalNames[1]}%`, `%${originalNames[2]}%`, `%${originalNames[3]}%`, `%${originalNames[4]}%`, `%${originalNames[5]}%`]
        );

        if (existingImages.length > 0) {
            return { error: 'ER_DUP_ENTRY' }
        }
        else return false
    }
}