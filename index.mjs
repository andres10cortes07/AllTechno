import express, {json} from "express";
const app = express ();
import cors from "cors"
import {router} from "./routes/routerAllTechno.mjs";

// desactivar header por defecto de express
app.disable("x-powered-by");

//middleware
app.use(json())

const ACCEPTED_ORIGINS = [
    "http://localhost:5000/allTechno",
    "http://localhost:5000/allTechno/cellphones",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5500/views/",
    "http://127.0.0.1:5500/views/products",
    "http://127.0.0.1:5500/views/products/product.html"
]

app.use(cors({
    origin: function (origin, callback) {
        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    }
}));

//definir el router que manejara los endpoints
app.use("/allTechno", router);

//definimos puerto e inicio de servidor
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})