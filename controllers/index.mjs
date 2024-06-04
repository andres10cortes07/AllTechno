import { ModelsIndex } from "../models/index.mjs";

export class ControllerIndex {

    static getProducts = async (req, res) => {
        const newProducts = await ModelsIndex.getNewProducts();
        const mostSelledProducts = await ModelsIndex.getSelledProducts();

        if (newProducts && mostSelledProducts) return res.json({newProducts, mostSelledProducts})
        return res.json({error : "Error in product search"}).status(400)
    }

    static searchProducts = async (req, res) => {
        const { search } = req.params
        const results = await ModelsIndex.searchProducts({ search })

        if (!results) return res.status(404).json({message : "no products found"})
        return res.json(results)
    }
}