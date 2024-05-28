import { ACCEPTED_ORIGINS } from "../routes/routerAllTechno.mjs"; 
import { validateLaptop, validateModifyLaptop } from "../schemas/schemasLapt.mjs";
import { laptopModels } from "../models/laptops.mjs"

export class ControllerLaptops {
    static getAll = async (req, res) => {
        const origin = req.header("origin");

        if (ACCEPTED_ORIGINS.includes(origin)) {
            res.header("Access-Control-Allow-Origin", origin)
        }

        const laptops = await laptopModels.getAll();
        return res.json(laptops).status(200)
    }

    static getById = async (req, res) => {
        const origin = req.header("origin");

        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            res.header("Access-Control-Allow-Origin", origin)
        }

        const { id } = req.params;
        const laptop = await laptopModels.getById({ id });

        if (laptop) return res.json(laptop)
        return res.json({ message : "Laptop not found" }).status(404)

    }

    static createLaptop = async (req, res) => {
        const result = validateLaptop(req.body);

        if (result.error) return res.json({ error : result.error.message}).status(400)
        return res.json(await laptopModels.createLaptop(result.data)).status(201)
    }

    static modifyLaptop = async (req, res) => {
        const result = validateModifyLaptop(req.body);

        if (result.error) return res.status(400).json({ error : result.error.message })

        const { id } = req.params
        const laptopModify = await laptopModels.modifyLaptop({ id, input: result.data })

        if(!laptopModify) return res.status(404).json({ error : "Laptop not found" })
        return res.status(200).json(laptopModify)
    }

    static deleteLaptop = async (req, res) => {
        const origin = req.header("origin");
        if (ACCEPTED_ORIGINS.includes(origin)) {
            res.header("Access-Control-Allow-Origin", origin)
        }

        const { id } = req.params;

        const deleteStatus = await laptopModels.deleteLaptop({id});
        
        if (!deleteStatus) return res.status(404).json({ error : "Laptop not found" })
        return res.status(200).json({ message : "successful" })
    }
}