import zod from "zod";

const schemaCellphone = zod.object({
    marca : zod.string().max(100),
    modelo : zod.string().max(100),
    bateria : zod.number().int().max(20000),
    procesador : zod.string().max(100),
    camaraFrontal : zod.number().int(),
    camaraPosterior : zod.number().int(),
    resolucion : zod.string().max(20),
    huella : zod.string().max(100).default("NO"),
    almacenamiento : zod.number().int(),
    ram : zod.number().int(),
    precio : zod.number().int(),
    colores : zod.string().max(100)
})

export const validateCellphone = (object) =>{
    return schemaCellphone.safeParse(object)
}

export const validateModifyCell = (object) => {
    return schemaCellphone.partial().safeParse(object)
}