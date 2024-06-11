import express, {json} from "express";
const app = express ();
import cors from "cors"
import {router} from "./routes/routerAllTechno.mjs";
import session from "express-session";
import crypto from "crypto";

// desactivar header por defecto de express
app.disable("x-powered-by");

const ACCEPTED_ORIGINS = [
    "http://localhost:5000/allTechno",
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

//middleware
app.use(json())

const secret = crypto.randomBytes(32).toString("hex")
app.use(session({
    secret: secret, // Usa una variable de entorno para el secreto
    resave: false, // Considera establecerlo en false para evitar reescribir sesiones no modificadas
    saveUninitialized: false, // Considera establecerlo en false para evitar guardar sesiones no modificadas
    cookie: {
        secure: false, // Asegúrate de usar cookies seguras en producción
        maxAge: 1000 * 60 * 60// Establece la duración de la cookie (en milisegundos)
    }
}));

//definir el router que manejara los endpoints
app.use("/allTechno", router);

//definimos puerto e inicio de servidor
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})