import { ControllerCellphones } from "../controllers/cellphones.mjs";
import { ControllerLaptops } from "../controllers/laptops.mjs";
import { ControllerIndex } from "../controllers/index.mjs";
import { ControllerPowerSupplies } from "../controllers/powerSupplies.mjs";
import { ControllerProcessors } from "../controllers/processors.mjs";
import { ControllerRam } from "../controllers/ram.mjs";
import { ControllerScreens } from "../controllers/screens.mjs";
import { ControllerDesktops } from "../controllers/desktops.mjs";
import { ControllerUsers } from "../controllers/user.mjs";

import { Router } from "express";
export const router = Router();

//? index routes
router.get("/", ControllerIndex.getProducts);
router.get("/:search", ControllerIndex.searchProducts);


//? cellphone routes
router.get("/cellphones/getAll/:order", ControllerCellphones.getAll);
router.get("/cellphones/:id", ControllerCellphones.getById);
router.post("/cellphones", ControllerCellphones.createCellphone);
router.patch("/cellphones/:id", ControllerCellphones.modifyCellphone);
router.delete("/cellphones/:id", ControllerCellphones.deleteCellphone);


//? laptops routes
router.get("/laptops/getAll/:order", ControllerLaptops.getAll);
router.get("/laptops/:id", ControllerLaptops.getById);
router.post("/laptops", ControllerLaptops.createLaptop);
router.patch("/laptops/:id", ControllerLaptops.modifyLaptop);
router.delete("/laptops/:id", ControllerLaptops.deleteLaptop);


//? powerSupplies routes
router.get("/powerSupplies/getAll/:order", ControllerPowerSupplies.getAll);
router.get("/powerSupplies/:id", ControllerPowerSupplies.getById);
router.post("/powerSupplies", ControllerPowerSupplies.createPowerSupply);
router.patch("/powerSupplies/:id", ControllerPowerSupplies.modifyPowerSupply);
router.delete("/powerSupplies/:id", ControllerPowerSupplies.deletePowerSupply);


//? processors routes
router.get("/processors/getAll/:order", ControllerProcessors.getAll);
router.get("/processors/:id", ControllerProcessors.getById);
router.post("/processors", ControllerProcessors.createProcessor);
router.patch("/processors/:id", ControllerProcessors.modifyProcessor);
router.delete("/processors/:id", ControllerProcessors.deleteProcessor);


//? ram routes
router.get("/ram/getAll/:order", ControllerRam.getAll);
router.get("/ram/:id", ControllerRam.getById);
router.post("/ram", ControllerRam.createRam);
router.patch("/ram/:id", ControllerRam.modifyRam);
router.delete("/ram/:id", ControllerRam.deleteRam);


//? screens routes
router.get("/screens/getAll/:order", ControllerScreens.getAll);
router.get("/screens/:id", ControllerScreens.getById);
router.post("/screens", ControllerScreens.createScreen);
router.patch("/screens:/id", ControllerScreens.modifyScreen);
router.delete("/screens/:id", ControllerScreens.deleteScreen);


//? desktopComputers routes
router.get("/desktopComputers/getAll/:order", ControllerDesktops.getAll);
router.get("/desktopComputers/:id", ControllerDesktops.getByid);
router.post("/desktopComputers", ControllerDesktops.createDesktopPc);
router.patch("/desktopComputers/:id", ControllerDesktops.modifyDesktopPc);
router.delete("/desktopComputers/:id", ControllerDesktops.deleteDesktopPc);

//? user routes
router.get("/user/:identificacion", ControllerUsers.changePassword);