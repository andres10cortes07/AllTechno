import { Router } from "express";
import { ControllerCellphones } from "../controllers/cellphones.mjs";
export const router = Router();

router.get("/cellphones", ControllerCellphones.getAll);

router.get("/cellphones:id", ControllerCellphones.getById);

router.post("/cellphones", ControllerCellphones.createCellphone);

router.patch("/cellphones:id", ControllerCellphones.modifyCellphone);

router.delete("/cellphones:id", ControllerCellphones.deleteCellphone);


// Definicion de los origenes aceptados para prevencion de ERROR CORS
export const ACCEPTED_ORIGINS = [
    "http://localhost:5000/allTechno",
    "http://localhost:5000/allTechno/cellphones",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:5500/"
]

router.options("/cellphones", (req, res) => {
    const origin = req.header("origin");
    if(ACCEPTED_ORIGINS.includes(origin) || !origin){
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
        res.sendStatus(200)
    }
    else {
        res.sendStatus(403)
    }
})