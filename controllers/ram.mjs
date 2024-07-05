import { ValidateRam, ValidateModifyRam } from "../schemas/schemasRam.mjs";
import { ModelsRam } from "../models/ram.mjs";
import { QueriesUsed } from "../models/constantQueries.mjs";
import fs from "node:fs";
import path from "node:path";

const saveImages = (file) => {
    const newPath = path.join('resources', 'uploads', 'ram', file.originalname)
    fs.writeFileSync(newPath, file.buffer);
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
        // extract JSON data from request body
        let data = JSON.parse(req.body.json_data)

        // Manage uploaded images
        const images = req.files
        if (!images || images.length === 0) {
            return res.status(400).json({ error : "No images uploaded" })
        }

        // add each of the names of the received images to originalNames
        let originalNames = images.map(image => image.originalname)
        const repeatedImages = await QueriesUsed.verifyRepeatedImages(originalNames)

        if (repeatedImages.error) {
            return res.status(400).json({error : repeatedImages.error})
        }

        // add the images to the data
        data.imagenes = images.map(image => saveImages(image))

        // validate data with the schemas
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