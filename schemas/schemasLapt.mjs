import zod from "zod";

// general error for length error
const errorLength = {error : "El dato ingresado es demasiado largo"};

// schema for table laptop
const schemaLaptop = zod.object ({
    marca : zod.string().max(100, errorLength),
    modelo : zod.string().max(100, errorLength),
    procesador : zod.string().max(100, errorLength),
    grafica : zod.string().max(100, errorLength).default("Graficos Integrados"),
    resolucion : zod.string().max(20, errorLength),
    tamañoPantalla : zod.number().int(),
    almacenamiento : zod.number().int(),
    ram : zod.number().int(),
    precio : zod.number().int(),
    colores : zod.string().max(100, errorLength)
})

// function for validate the laptop creation
export const validateLaptop = (object) => {
    return schemaLaptop.safeParse(object)
}

// function for validate the laptop modification
export const validateModifyLaptop = (object) => {
    return schemaLaptop.partial().safeParse(object)
}