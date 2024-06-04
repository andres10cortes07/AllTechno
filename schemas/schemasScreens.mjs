import zod from "zod"

const errorLength = {error: "El dato ingresado es demasiado largo"}

const schemaScreens = zod.object({
    marca : zod.string().max(100, errorLength),
    modelo : zod.string().max(100, errorLength),
    dimensiones : zod.string().max(100, errorLength),
    pulgadas : zod.number().int(),
    resolucion : zod.string().max(50, errorLength),
    tipo : zod.string().max(50, errorLength),
    precio : zod.number().int()
})

export const ValidateScreen = (object) => {
    return schemaScreens.safeParse(object)
}

export const ValidateModifyScreen = (object) => {
    return schemaScreens.partial().safeParse(object)
}