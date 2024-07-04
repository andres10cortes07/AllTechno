import { cellphoneModels } from "../models/cellphones.mjs";
import { validateCellphone, validateModifyCell } from "../schemas/schemasCell.mjs";
import fs from "node:fs"

const saveImages = (file) => {
    const newPath = `resources/uploads/cellphones/${file.originalname}`
    fs.renameSync(file.path, newPath)
    return newPath
}
export class ControllerCellphones {

    static getAll = async (req, res) => {
        const { order } = req.params
        return res.json(await cellphoneModels.getAll({ order }))
    }

    static getById = async (req, res) => {
        const { id } = req.params;
        const cellphone = await cellphoneModels.getById({ id });

        if (cellphone) res.json(cellphone)
        else res.status(404).json({message: "Cellphone not found"})
    }

    static createCellphone = async (req, res) => {
        // Extraer los datos JSON del cuerpo de la solicitud
        let data = JSON.parse(req.body.json_data)
        
        // Manejar las imágenes subidas
        const images = req.files;
        if (!images || images.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }

        let originalNames = []
        data.imagenes = images.map(image => {
            originalNames.push(image.originalname)
            return saveImages(image);
        })


        const result = validateCellphone(data);
        if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })
        
        const newCellphone = await cellphoneModels.createCellphone({originalNames, input:result.data})
        if (newCellphone.error) return res.status(400).json({error : newCellphone.error})
        return res.status(201).json({ message : "Cellphone created successfully" })
    }

    static modifyCellphone = async (req, res) => {
        const result = validateModifyCell(req.body);

        if (result.error) return res.status(400).json({ error: JSON.parse(result.error.message) })

        const { id } = req.params;
        const cellphoneModified = await cellphoneModels.modifyCellphone({ id, input: result.data });

        if (!cellphoneModified) return res.status(400).json({ error: "Cellphone not found" });
        return res.json(cellphoneModified)
    }

    static deleteCellphone = async (req, res) => {
        const { id } = req.params;
        const deleteStatus = await cellphoneModels.deleteCellphone({ id });

        if (!deleteStatus) return res.status(404).json({ error: "Cellphone not found" })
        return res.status(200).json({ message: "Cellphone delete successful" })
    }
}