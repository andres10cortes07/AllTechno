import { connection } from "./connection.mjs";

export class ModelsUser {

    static getEmail = async ({identificacion}) => {
        const [email] = await connection.query(
            `
                SELECT correo FROM usuario WHERE identificacion = ?
            `, [identificacion]
        )

        // user was not found
        if(email.length == 0) return false
        // user was found
        return email
    }

    static modifyPassword = async ({identificacion, newPass}) => {
        const [passwordModified] = await connection.query(
            `
                UPDATE usuario SET contraseña = ? WHERE identificacion = ?;
            `, [newPass, identificacion]
        )

        if (passwordModified.length == 0) return false
        return true
    }

    static getAll = async () => {
        const [users] = await connection.query(
            `
                SELECT identificacion, nombres, apellidos, correo, celular, rol FROM usuario ORDER BY nombres ASC
            `
        )

        return users
    }

    static getById = async ({identificacion}) => {
        const [user] = await connection.query(
            `
                SELECT identificacion, nombres, apellidos, correo, celular FROM usuario WHERE identificacion = ?
            `, [identificacion]
        )

        // user was not found
        if (user.length == 0) return false
        // user was found
        return user
    }

    static createUser = async ({newPass, input}) => {
        try {
            await connection.query(
                `
                    INSERT INTO usuario (identificacion, nombres, apellidos, correo, contraseña, celular, rol)
                    VALUES (?, ?, ?, ?, ?, ?, ?)            
                `, [input.identificacion, input.nombres, input.apellidos, input.correo, newPass, input.celular, input.rol]
            )
    
            const [newUser] = await connection.query(
                `
                    SELECT identificacion, nombres, apellidos, correo, celular, rol FROM usuario WHERE identificacion = ?
                `, [input.identificacion]
            )
    
            return newUser
        }
        catch (error){
            return { error : error.code}
        }
        
    }

    static modifyUser = async ({identificacion, input}) => {
        const [user] = await this.getById({identificacion})
        if(!user) return false
        
        // the data is modified depending on whether it is included in the data or not.
        const newData = {
            identificacion: input.identificacion ?? user.identificacion,
            nombres: input.nombres ?? user.nombres,
            apellidos: input.apellidos ?? user.apellidos,
            correo: input.correo ?? user.correo ,
            celular: input.celular ?? user.celular
        }

        await connection.query(
            `
                UPDATE usuario SET identificacion = ?, nombres = ?, apellidos = ?, correo = ?, celular = ? WHERE identificacion = ?
            `, [newData.identificacion, newData.nombres, newData.apellidos, newData.correo, newData.celular, user.identificacion]
        )


        const userModified = await this.getById({identificacion: newData.identificacion})

        if(!userModified) return false
        return userModified
    }

    static deleteUser = async ({identificacion}) => {
        try {
            const [userDelete] = await connection.query(
                `
                    DELETE FROM usuario WHERE identificacion = ?
                `, [identificacion]
            )

            // user was deleted
            if(userDelete.affectedRows == 1) return true
            // user was not deleted
            return false

        } catch (error) {
            return error
        }
    }

    static login = async (infoUser) => {
        const [user] = await connection.query(
            `
                SELECT identificacion, nombres, apellidos, correo, celular FROM usuario WHERE correo = ? AND contraseña = ?
            `, [infoUser.correo, infoUser.contraseña]
        )

        // incorrect credentials
        if(user.length == 0) return false
        // incorrect credentials
        return user[0]
    }

    static accessToRol = async (email) => {

            const [[rol]] = await connection.query(
                `
                    SELECT rol FROM usuario WHERE correo = ?
                `
            , [email])
    
            return rol.rol
    
    }
}