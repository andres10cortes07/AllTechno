import zod from "zod";

const errorLength = {error : "El dato ingresado es demasiado largo"}

const schemaProcessor = zod.object({
    marca : zod.string().max(100, errorLength),
    modelo : zod.string().max(100, errorLength),
    numNucleos : zod.number().int(),
    numHilos : zod.number().int(),
    relojBase : zod.string().max(100, errorLength),
    precio : zod.number().int(),
    imagenes : zod.array(zod.string()).min(1).max(6)
})

export const ValidateProcessor = (object) => {
    return schemaProcessor.safeParse(object)
}

export const ValidateModifyProcessor = (object) => {
    return schemaProcessor.partial().safeParse(object)
}