import { ValidateScreen, ValidateModifyScreen } from "../schemas/schemasScreens.mjs";
import { ModelsScreens } from "../models/screens.mjs";
import { QueriesUsed } from "../models/constantQueries.mjs";
import fs from "node:fs";
import path from "node:path";

const saveImages = (file) => {
    const newPath = path.join('resources', 'uploads', 'screens', file.originalname)
    fs.writeFileSync(newPath, file.buffer);
    return newPath
}
export class ControllerScreens {

    static getAll = async (req, res) => {
        const {order} = req.params
        return res.json(await ModelsScreens.getAll({order}))
    }

    static getById = async (req, res) => {
        const { id } = req.params
        const screen = await ModelsScreens.getById({ id })

        if(screen) return res.json(screen)
        return res.json({error : "Screen not  found"})
    }

    static createScreen = async (req, res) => {
        // extract JSON data from request body
        let data = JSON.parse(req.body.json_data)

        // Manage uploaded images
        const images = req.files
        if (!images || images.length === 0) {
            return res.status(400).json({ error : "Debes cargar por lo menos una imagen" })
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
        const result = ValidateScreen(data)
        if(result.error) return res.status(400).json({error : JSON.parse(result.error.message)})

        const newScreen = await ModelsScreens.createScreen({originalNames, input:result.data})

        if (newScreen.error) return res.status(400).json({ error : newScreen.error })
        return res.status(201).json({ message : "Screen created successfully" })
    }

    static modifyScreen = async (req, res) => {
        const result = ValidateModifyScreen(req.body)
        
        if(result.error) return res.json({error : JSON.parse(result.error.message)}).status(400)
        
        const id = req.params
        const screenModified = await ModelsScreens.modifyScreen({id, input:result.data})

        if(screenModified) return res.json(screenModified)
        return res.json({error : "Screen not found"}).status(404)
    }

    static deleteScreen = async (req, res) => {
        const { id } = req.params
        const deleteStatus = await ModelsScreens.deleteScreen({ id })
        
        if(deleteStatus) return res.json({message : "Screen deleted successfully"})
        return res.json({error : "Screen not found"}).status(404)
    }
}