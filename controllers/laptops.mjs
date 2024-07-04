import { validateLaptop, validateModifyLaptop } from "../schemas/schemasLapt.mjs";
import { laptopModels } from "../models/laptops.mjs"
import fs from "node:fs";

const saveImages = (file) => {
    const newPath = `resources/uploads/laptops/${file.originalname}`
    fs.renameSync(file.path, newPath)
    return newPath
}

export class ControllerLaptops {
    static getAll = async (req, res) => {
        const { order } = req.params
        return res.json(await laptopModels.getAll({ order }))
    }

    static getById = async (req, res) => {
        const { id } = req.params;
        const laptop = await laptopModels.getById({ id });

        if (laptop) return res.json(laptop)
        return res.json({ message : "Laptop not found" }).status(404)

    }

    static createLaptop = async (req, res) => {
        let data = JSON.parse(req.body.json_data)

        const images = req.files
        if (!images || images.length === 0){
            return res.status(400).json({ error : 'No images uploaded' })
        }

        let originalNames = []
        data.imagenes = images.map(image => {
            originalNames.push(image.originalname)
            return saveImages(image);
        })

        const result = validateLaptop(data)
        if (result.error) return res.status(400).json({ error : JSON.parse(result.error.message)})

        const newLaptop = await laptopModels.createLaptop({originalNames, input:result.data})

        if(newLaptop.error) return res.status(400).json({ error : newLaptop.error })
        return res.status(201).json({ message : "Laptop created successfully" })
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
        const { id } = req.params;

        const deleteStatus = await laptopModels.deleteLaptop({id});
        
        if (!deleteStatus) return res.status(404).json({ error : "Laptop not found" })
        return res.status(200).json({ message : "successful" })
    }
}