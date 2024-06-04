import zod from "zod"

const errorLength = {error: "El dato ingresado es demasiado largo"}

const schemaPowerSupplie = zod.object({
    marca : zod.string().max(100, (errorLength)),
    modelo : zod.string().max(100, (errorLength)),
    voltaje : zod.number().int(),
    potencia : zod.number().int(),
    certificacion : zod.string().max(50),
    precio : zod.number().int()
})

export const ValidatePowerSupply = (object) => {
    return schemaPowerSupplie.safeParse(object)
}

export const ValidateModifyPowerSupply = (object) => {
    return schemaPowerSupplie.partial().safeParse(object)
}