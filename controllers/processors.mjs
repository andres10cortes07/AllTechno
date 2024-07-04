import { ValidateProcessor, ValidateModifyProcessor } from "../schemas/schemasProcess.mjs";
import { ModelsProcessors } from "../models/processors.mjs";
import fs from "node:fs"

const saveImages = (file)  => {
    const newPath = `resources/uploads/processors/${file.originalname}`
    fs.renameSync(file.path, newPath)
    return newPath
}

export class ControllerProcessors {
    static getAll = async (req, res) => {
        const {order} = req.params
        return res.json(await ModelsProcessors.getAll({order}))
    }

    static getById = async (req, res) => {
        const { id } = req.params;
        const processor = await ModelsProcessors.getById({ id });

        if(processor) return res.json(processor)
        return res.json({error : "Processor not found"}).status(404)
    }

    static createProcessor = async (req, res) => {
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

        const result = ValidateProcessor(data)
        if(result.error) return res.status(400).json({error : JSON.parse(result.error.message)})

        const newProcessor = await ModelsProcessors.createProcessor({originalNames, input:result.data})
        
        if (newProcessor.error) return res.status(400).json({ error : newProcessor.error })
        return res.status(201).json({ message : "Processor created successfully" })
    }

    static modifyProcessor = async (req, res) => {
        const result = ValidateModifyProcessor(req.body)

        if(result.error) return res.json({error : JSON.parse(result.error.message)}).status(400);

        const { id } = req.params
        const ProcessorModified = await ModelsProcessors.modifyProcessor({ id, input:result.data});

        if (ProcessorModified) return res.json(ProcessorModified)
        return res.json({error : "Processor not found"}).status(404)
    }

    static deleteProcessor = async (req, res) => {
        const { id } = req.params;
        const deleteStatus = await this.deleteProcessor({id});
        
        if (deleteStatus) return res.json({message : "Processor deleted successfully"});
        return res.json({error : "Processor not found"})
    }
}