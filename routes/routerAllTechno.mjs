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

import multer from "multer";

//? index routes
router.get("/", ControllerIndex.getProducts);
router.get("/:search", ControllerIndex.searchProducts);

//* We use temporary memory storage for images submitted through the form.
//* This allows us to validate the images before permanently saving them to the disk and database.

//? cellphone routes
const uploadCellphone = multer({ storage: multer.memoryStorage() });
router.get("/cellphones/getAll/:order", ControllerCellphones.getAll);
router.get("/cellphones/:id", ControllerCellphones.getById);
router.post("/cellphones", uploadCellphone.array('imagenes', 6), ControllerCellphones.createCellphone);
router.patch("/cellphones/:id", ControllerCellphones.modifyCellphone);
router.delete("/cellphones/:id", ControllerCellphones.deleteCellphone);


//? laptops routes
const uploadLaptop = multer({ storage: multer.memoryStorage() });
router.get("/laptops/getAll/:order", ControllerLaptops.getAll);
router.get("/laptops/:id", ControllerLaptops.getById);
router.post("/laptops", uploadLaptop.array("imagenes", 6), ControllerLaptops.createLaptop);
router.patch("/laptops/:id", ControllerLaptops.modifyLaptop);
router.delete("/laptops/:id", ControllerLaptops.deleteLaptop);


//? powerSupplies routes
const uploadPowerSupply = multer({ storage: multer.memoryStorage() });
router.get("/powerSupplies/getAll/:order", ControllerPowerSupplies.getAll);
router.get("/powerSupplies/:id", ControllerPowerSupplies.getById);
router.post("/powerSupplies", uploadPowerSupply.array("imagenes", 6), ControllerPowerSupplies.createPowerSupply);
router.patch("/powerSupplies/:id", ControllerPowerSupplies.modifyPowerSupply);
router.delete("/powerSupplies/:id", ControllerPowerSupplies.deletePowerSupply);


//? processors routes
const uploadProcessor = multer({ storage: multer.memoryStorage() });
router.get("/processors/getAll/:order", ControllerProcessors.getAll);
router.get("/processors/:id", ControllerProcessors.getById);
router.post("/processors", uploadProcessor.array("imagenes", 6), ControllerProcessors.createProcessor);
router.patch("/processors/:id", ControllerProcessors.modifyProcessor);
router.delete("/processors/:id", ControllerProcessors.deleteProcessor);


//? ram routes
const uploadRam = multer({ storage: multer.memoryStorage() });
router.get("/ram/getAll/:order", ControllerRam.getAll);
router.get("/ram/:id", ControllerRam.getById);
router.post("/ram", uploadRam.array("imagenes", 6), ControllerRam.createRam);
router.patch("/ram/:id", ControllerRam.modifyRam);
router.delete("/ram/:id", ControllerRam.deleteRam);


//? screens routes
const uploadScreens = multer({ storage: multer.memoryStorage() });
router.get("/screens/getAll/:order", ControllerScreens.getAll);
router.get("/screens/:id", ControllerScreens.getById);
router.post("/screens", uploadScreens.array("imagenes", 6), ControllerScreens.createScreen);
router.patch("/screens:/id", ControllerScreens.modifyScreen);
router.delete("/screens/:id", ControllerScreens.deleteScreen);


//? desktopComputers routes
const uploadDesktopPc = multer({ storage: multer.memoryStorage() });
router.get("/desktopComputers/getAll/:order", ControllerDesktops.getAll);
router.get("/desktopComputers/:id", ControllerDesktops.getByid);
router.post("/desktopComputers", uploadDesktopPc.array("imagenes", 6), ControllerDesktops.createDesktopPc);
router.patch("/desktopComputers/:id", ControllerDesktops.modifyDesktopPc);
router.delete("/desktopComputers/:id", ControllerDesktops.deleteDesktopPc);

//? user routes
router.get("/user/changePass/:identificacion", ControllerUsers.changePassword);
router.get("/user/getAll/:order", ControllerUsers.getUsers);
router.get("/user/:identificacion", ControllerUsers.getById);
router.post("/user", ControllerUsers.createUser);
router.patch("/user/:identificacion", ControllerUsers.modifyUser);
router.delete("/user/:identificacion", ControllerUsers.deleteUser);

//? session routes
router.post("/admin/login", ControllerUsers.login);
router.get("/admin/logout", ControllerUsers.logout);

// Ruta para verificar la sesión
router.get('/api/session', ControllerUsers.validateSession);