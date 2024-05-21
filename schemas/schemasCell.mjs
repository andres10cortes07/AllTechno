import zod from "zod";

const schemaCellphone = zod.object({
    marca : zod.string(),
    modelo : zod.string(),
    bateria : zod.number().int().max(20000),
    procesador : zod.string().length(100),
    camaraFrontal : zod.number().int(),
    camaraPosterior : zod.number().int(),
    resolucion : zod.string().length(20),
    huella : zod.string().length(100).default("NO"),
    almacenamiento : zod.number().int(),
    ram : zod.number().int(),
    precio : zod.number().int(),
    colores : zod.string().length(100)
})

export const validateCellphone = (object) =>{
    return schemaCellphone.safeParse(object)
}

export const validateModifyCell = (object) => {
    return schemaCellphone.partial().safeParse(object)
}