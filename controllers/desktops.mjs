import { ValidateDesktop, ValidateModifyDesktop } from "../schemas/schemasDesktops.mjs";
import { ModelsDesktops } from "../models/desktops.mjs";
import { QueriesUsed } from "../models/constantQueries.mjs";
import fs from "node:fs"
import path from "node:path";

const saveImages = (file) => {
    const newPath = path.join('resources', 'uploads', 'desktops', file.originalname)
    fs.writeFileSync(newPath, file.buffer);
    return newPath
}
export class ControllerDesktops {

    static getAll = async (req, res) => {
        const { order } = req.params
        return res.json(await ModelsDesktops.getAll({ order }))
    }

    static getByid = async (req, res) => {
        const { id } = req.params
        const desktopPc = await ModelsDesktops.getById({ id })
        
        if(desktopPc) return res.json(desktopPc)
        return res.json({error : "Desktop pc not found"}).status(404)
    }

    static createDesktopPc = async (req, res) => {
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
        const result = ValidateDesktop(data)
        if (result.error) return res.status(400).json({error : JSON.parse(result.error.message)})
        
        const newDesktopPc = await ModelsDesktops.createDesktopPc({originalNames, input:result.data})

        if (newDesktopPc.error) return res.status(400).json({ error : newDesktopPc.error})
        return res.status(201).json({ message : "Desktop pc created successfully" })
    }

    static modifyDesktopPc = async (req, res) => {
        const result = ValidateModifyDesktop(req.body)

        if (result.error) return res.json({error : JSON.parse(result.error.message)})

        const { id } = req.params
        const desktopPcModified = await ModelsDesktops.modifyDesktopPc({id, input: result.data})
        
        if (desktopPcModified) return res.json(desktopPcModified)
        return res.json({error : "Desktop pc not found"}).status(404)
    }

    static deleteDesktopPc = async (req, res) => {
        const { id } = req.params
        const deleteStatus = await ModelsDesktops.deleteDesktopPc({ id })

        if (deleteStatus) return res.json({message : "Cellphone deleted successfully"})
        return res.json({error : "Desktop pc not found"})
    }
}