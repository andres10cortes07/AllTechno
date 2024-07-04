import zod from "zod"

const errorLength = {error: "El dato ingresado es demasiado largo"}

const schemaPowerSupplies = zod.object({
    marca : zod.string().max(100, (errorLength)),
    modelo : zod.string().max(100, (errorLength)),
    voltaje : zod.number().int(),
    potencia : zod.number().int(),
    certificacion : zod.string().max(50),
    precio : zod.number().int(),
    imagenes : zod.array(zod.string()).min(1).max(6)
})

export const ValidatePowerSupply = (object) => {
    return schemaPowerSupplies.safeParse(object)
}

export const ValidateModifyPowerSupply = (object) => {
    return schemaPowerSupplies.partial().safeParse(object)
}