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

    static getAll = async ({order}) => {
        // Define las órdenes permitidas
        const validOrders = {
            "nombres ASC": "nombres ASC",
            "nombres DESC": "nombres DESC"
        };

        // Selecciona el orden válido, por defecto a 'nombre DESC' si no es válido
        const orderBy = validOrders[order] || "nombres DESC";

        const [users] = await connection.query(
            `
                SELECT identificacion, nombres, apellidos, correo, celular FROM usuario ORDER BY ${orderBy}
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

        if (user.length == 0) return false
        return user
    }

    static createUser = async ({newPass, input}) => {
        try {
            await connection.query(
                `
                    INSERT INTO usuario (identificacion, nombres, apellidos, correo, contraseña, celular)
                    VALUES (?, ?, ?, ?, ?, ?)            
                `, [input.identificacion, input.nombres, input.apellidos, input.correo, newPass, input.celular]
            )
    
            const [newUser] = await connection.query(
                `
                    SELECT identificacion, nombres, apellidos, correo, celular FROM usuario WHERE identificacion = ?
                `, [input.identificacion]
            )
    
            return newUser
        }
        catch (error){
            return false
        }
        
    }

    static modifyUser = async ({identificacion, input}) => {
        const [user] = await this.getById({identificacion})
        if(!user) return false
        
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

            if(userDelete.affectedRows == 1) return true
            return false

        } catch (error) {
            console.log(error)
            return false
        }
    }

    static login = async (infoUser) => {
        const [user] = await connection.query(
            `
                SELECT identificacion, nombres, apellidos, correo, celular FROM usuario WHERE correo = ? AND contraseña = ?
            `, [infoUser.correo, infoUser.contraseña]
        )

        if(user.length == 0) return false
        return user[0]
    }
}