import express, {json} from "express";
const app = express ();
import cors from "cors"
import {router} from "./routes/routerAllTechno.mjs";
import session from "express-session";
import crypto from "crypto";

// disable express default header
app.disable("x-powered-by");

const ACCEPTED_ORIGINS = [
    "http://localhost:5000/allTechno",
    "http://127.0.0.1:5500"
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

// middleware
app.use(json())

// session configuration
app.use(session({
    secret: crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        maxAge: 1000 * 60 * 60
    }
}));

// router definition to manage endpoints
app.use("/allTechno", router);

// define server port and boot
const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})