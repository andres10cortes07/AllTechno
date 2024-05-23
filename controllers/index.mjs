import { ACCEPTED_ORIGINS } from "../routes/routerAllTechno.mjs";
import { ModelsIndex } from "../models/index.mjs";

export class ControllerIndex {

    static getProducts = async (req, res) => {
        const origin = req.header("origin");

        if (ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin);
        }

        const newProducts = await ModelsIndex.getNewProducts();
        const mostSelledProducts = await ModelsIndex.getSelledProducts();

        if (newProducts && mostSelledProducts) return res.json({newProducts, mostSelledProducts})
        return res.json({error : "Error in product search"}).status(400)
    }
}