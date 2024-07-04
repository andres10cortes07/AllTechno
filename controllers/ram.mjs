import { ValidateRam, ValidateModifyRam } from "../schemas/schemasRam.mjs";
import { ModelsRam } from "../models/ram.mjs";
import fs from "node:fs"

const saveImages = (file) => {
    const newPath = `resources/uploads/ram/${file.originalname}`
    fs.renameSync(file.path, newPath)
    return newPath
}

export class ControllerRam {

    static getAll = async (req, res) => {
        const {order} = req.params
        return res.json(await ModelsRam.getAll({order}))
    }

    static getById = async (req, res) => {
        const { id } = req.params
        const ram = await ModelsRam.getById({ id });

        if(ram) return res.json(ram)
        return res.json({error : "Ram not found"}).status(404)
    }

    static createRam = async (req, res) => {
        let data = JSON.parse(req.body.json_data)
        const images = req.files

        if (!images || images.length === 0) {
            return res.status(400).json({ error : "No images uploaded" })
        }

        let originalNames = []
        data.imagenes = images.map(image => {
            originalNames.push(image.originalname)
            return saveImages(image);
        })

        const result = ValidateRam(data)
        if(result.error) return res.status(400).json({error : JSON.parse(result.error.message)})

        const newRam = await ModelsRam.createRam({originalNames, input:result.data})

        if (newRam.error) return res.status(400).json({ error : newRam.error })
        return res.status(201).json({ message : "Ram created successfully" })
    }

    static modifyRam = async (req, res) => {
        const result = ValidateModifyRam(req.body);

        if (result.error) return res.json({error : JSON.parse(result.error.message)}).status(400)

        const {id} = req.params
        const ramModified = await ModelsRam.createRam({id, input:result.data}) 
        
        if (ramModified) return res.json(ramModified)
        return res.json({error : "Ram not found"}).status(404)
    }

    static deleteRam = async (req, res) => {
        const {id} = req.params
        const deleteStatus = await ModelsRam.deleteRam({id})
        
        if(deleteStatus) return res.json({message : "Ram deleted successfully"})
        return res.json({error : "Ram not found"}).status(404)
    }
}