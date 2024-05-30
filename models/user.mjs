import { connection } from "./connection.mjs";

export class ModelsUser {

    static getEmail = async ({identificacion}) => {
        const [email] = await connection.query(
            `
                SELECT correo FROM usuario WHERE identificacion = ?
            `, [identificacion]
        )

        if(email.length == 0) return false
        return email
    }

    static modifyPassword = async ({identificacion, newPass}) => {
        const [passwordModified] = await connection.query(
            `
                UPDATE usuario SET contraseña = ? WHERE identificacion = ?;
            `, [newPass, identificacion]
        )

        if(passwordModified.length == 0) return false
        return true
    }

}