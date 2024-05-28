import { ControllerCellphones } from "../controllers/cellphones.mjs";
import { ControllerLaptops } from "../controllers/laptops.mjs";
import { ControllerIndex } from "../controllers/index.mjs";
import { ControllerPowerSupplies } from "../controllers/powerSupplies.mjs";
import { ControllerProcessors } from "../controllers/processors.mjs";
import { ControllerRam } from "../controllers/ram.mjs";
import { ControllerScreens } from "../controllers/screens.mjs";

import { Router } from "express";
export const router = Router();

//? index routes
router.get("/", ControllerIndex.getProducts);

//? cellphone routes
router.get("/cellphones", ControllerCellphones.getAll);
router.get("/cellphones/:id", ControllerCellphones.getById);
router.post("/cellphones", ControllerCellphones.createCellphone);
router.patch("/cellphones/:id", ControllerCellphones.modifyCellphone);
router.delete("/cellphones/:id", ControllerCellphones.deleteCellphone);


//? laptops routes
router.get("/laptops", ControllerLaptops.getAll);
router.get("/laptops/:id", ControllerLaptops.getById);
router.post("/laptops", ControllerLaptops.createLaptop);
router.patch("/laptops/:id", ControllerLaptops.modifyLaptop);
router.delete("/laptops/:id", ControllerLaptops.deleteLaptop);


//? powerSupplies routes
router.get("/powerSupplies", ControllerPowerSupplies.getAll);
router.get("/powerSupplies:id", ControllerPowerSupplies.getById);
router.post("/powerSupplies", ControllerPowerSupplies.createPowerSupply);
router.patch("/powerSupplies:id", ControllerPowerSupplies.modifyPowerSupply);
router.delete("/powerSupplies:id", ControllerPowerSupplies.deletePowerSupply);


//? processors routes
router.get("/processors", ControllerProcessors.getAll);
router.get("/processors:id", ControllerProcessors.getById);
router.post("/processors", ControllerProcessors.createProcessor);
router.patch("/processors:id", ControllerProcessors.modifyProcessor);
router.delete("/processors:id", ControllerProcessors.deleteProcessor);


//? ram routes
router.get("/ram", ControllerRam.getAll);
router.get("/ram:id", ControllerRam.getById);
router.post("/ram", ControllerRam.createRam);
router.patch("/ram:id", ControllerRam.modifyRam);
router.delete("/ram:id", ControllerRam.deleteRam);


//? screens routes
router.get("/screens", ControllerScreens.getAll);
router.get("/screens:id", ControllerScreens.getById);
router.post("/screens", ControllerScreens.createScreen);
router.patch("/screens:id", ControllerScreens.modifyScreen);
router.delete("/screens:id", ControllerScreens.deleteScreen);


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