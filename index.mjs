import express, {json} from "express";
const app = express ();
import {router} from "./routes/routerAllTechno.mjs";

// desactivar header por defecto de express
app.disable("x-powered-by");

//middleware
app.use(json())

//definir el router que manejara los endpoints
app.use("/allTechno", router);

//definimos puerto e inicio de servidor
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})