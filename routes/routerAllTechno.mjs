import { Router } from "express";
import { ControllerCellphones } from "../controllers/cellphones.mjs";
export const router = Router();

router.get("/cellphones", ControllerCellphones.getAll);

router.get("/cellphones:id", ControllerCellphones.getById);

router.post("/cellphones", ControllerCellphones.createCellphone);

router.patch("/cellphones:id", ControllerCellphones.modifyCellphone);

router.delete("/cellphones:id", ControllerCellphones.deleteCellphone);

//* no usare el router.options donde se colocan los header para decir los origenes y metodos aceptados
//! puede mandar error (si manda lo descomentarea GENIOO)

// router.options("/", (req, res) => {
//     const origin = req.header("origin");
//     if(ACCEPTED_ORIGINS.includes(origin)){
//         res.header("Access-Control-Allow-Origin", origin);
//         res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE")
//         res.sendStatus(200)
//     }
//     else {
//         res.sendStatus(403)
//     }
// })