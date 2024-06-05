import zod from "zod";

const errorLength = {error : "El dato ingresado es demasiado largo"}

const schemaDesktops = zod.object({
    procesador : zod.string().max(100, errorLength),
    grafica : zod.string().max(100, errorLength).default("Graficos Integrados"),
    ram : zod.string().max(100, errorLength),
    almacenamiento : zod.string().max(100, errorLength),
    board : zod.string().max(100, errorLength),
    chasis : zod.string().max(100, errorLength),
    fuente : zod.string().max(100, errorLength),
    refrigeracion : zod.string().max(100, errorLength).default("Refrigeracion de stock"),
    precio :  zod.number().int()
})

export const ValidateDesktop = (object) => {
    return schemaDesktops.safeParse(object)
}

export const ValidateModifyDesktop = (object) => {
    return schemaDesktops.partial().safeParse(object)
}