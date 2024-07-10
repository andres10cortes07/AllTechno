import { ModelsPowerSupplies } from "../models/powerSupplies.mjs";
import { ValidatePowerSupply, ValidateModifyPowerSupply } from "../schemas/schemasPowerS.mjs";
import { QueriesUsed } from "../models/constantQueries.mjs";
import fs from "node:fs";
import path from "node:path";

const saveImages = (file) => {
    const newPath = path.join('resources', 'uploads', 'powerSupplies', file.originalname)
    fs.writeFileSync(newPath, file.buffer);
    return newPath
}
export class ControllerPowerSupplies {

    static getAll = async (req, res) => {
        const {order} = req.params
        return res.json(await ModelsPowerSupplies.getAll({order}))
    }

    static getById = async (req, res) => {
        const { id } = req.params
        const powerSupply = await ModelsPowerSupplies.getById({id})

        if (powerSupply) return res.json(powerSupply)
        return res.json({error : "Power Supply not found"}).status(404)
    }

    static createPowerSupply = async (req, res) => {
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
        const result = ValidatePowerSupply(data)
        if(result.error) return res.status(400).json({error: JSON.parse(result.error.message)})
        
        const newPowerSupply = await ModelsPowerSupplies.createPowerSupply({originalNames, input:result.data})

        if(newPowerSupply.error) return res.status(400).json({error : newPowerSupply.error})
        return res.status(201).json({ message : "Power supply created successfully" })
    }

    static modifyPowerSupply = async (req, res) => {
        const result = ValidateModifyPowerSupply(req.body);

        if(result.error) return res.json({error: result.error.message})

        const id = req.params;
        const PowerSupplyModified = await ModelsPowerSupplies.createPowerSupply({ id, input:result.data })

        if(PowerSupplyModified) return res.json(PowerSupplyModified)
        return res.json({error: "Power Supply not found"}).status(404)
    }

    static deletePowerSupply = async (req, res) => {
        const { id } = req.params
        const elimination = await ModelsPowerSupplies.deletePowerSupply({ id });
        
        if (elimination) return res.json({message: "Power Supply delete successfully"})
        return res.json({error : "Power Supply not found"}).status(404)
    }
}