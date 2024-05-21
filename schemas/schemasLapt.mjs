import zod from "zod";

// general error for length error
const errorLength = {error : "El dato ingresado es demasiado largo"};

// schema for table laptop
const schemaLaptop = zod.object ({
    marca : zod.string().length(100, (errorLength)),
    modelo : zod.string().length(100, (errorLength)),
    procesador : zod.string().length(100, (errorLength)),
    grafica : zod.string().length(100, (errorLength)),
    resolucion : zod.string().length(20, (errorLength)),
    tamañoPantalla : zod.number().int().max(1000000),
    almacenamiento : zod.number().int().max(1000000),
    ram : zod.number().int().max(10000),
    precio : zod.number().int(),
    colores : zod.string().length(100, (errorLength))
})

// function for validate the laptop creation
export const validateLaptop = (object) => {
    return schemaLaptop.safeParse(object)
}

// function for validate the laptop modification
export const validateModifyLaptop = (object) => {
    return schemaLaptop.partial().safeParse(object)
}