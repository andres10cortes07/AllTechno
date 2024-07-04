import zod from "zod"

const errorLength = {error: "El dato ingresado es demasiado largo"}

const schemaRam = zod.object({
    marca : zod.string().max(100, errorLength),
    modelo : zod.string().max(100, errorLength),
    capacidad : zod.number().int(),
    velocidad : zod.number().int(),
    tipo : zod.string().max(100, errorLength),
    led : zod.string().max(100, errorLength),
    precio : zod.number().int(),
    imagenes : zod.array(zod.string()).min(1).max(6)
})

export const ValidateRam = (object) => {
    return schemaRam.safeParse(object)
}

export const ValidateModifyRam = (object) => {
    return schemaRam.partial().safeParse(object)
}