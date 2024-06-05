import zod from "zod"

const errorLength = {error : "El dato ingresado es demasiado largo"}

const schemaUser = zod.object({
    nombres : zod.string().max(100, errorLength),
    apellidos : zod.string().max(100, errorLength),
    correo : zod.string().max(50, errorLength),
    celular : zod.string().max(10, errorLength)
})

export const ValidateUser = (object) => {
    return schemaUser.safeParse(object)
}

export const ValidateModifyUser = (object) => {
    return schemaUser.partial().safeParse(object)
}
