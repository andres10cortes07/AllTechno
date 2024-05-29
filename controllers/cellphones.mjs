import { cellphoneModels } from "../models/cellphones.mjs";
import { validateCellphone, validateModifyCell } from "../schemas/schemasCell.mjs";


export class ControllerCellphones {

    static getAll = async (req, res) => {
        return res.json(await cellphoneModels.getAll())
    }

    static getById = async (req, res) => {
        const { id } = req.params;
        const cellphone = await cellphoneModels.getById({ id });

        if (cellphone) res.json(cellphone)
        else res.status(404).json({message: "Cellphone not found"})
    }

    static createCellphone = async (req, res) => {
        const result = validateCellphone(req.body);

        if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)})
        res.status(201).json(await cellphoneModels.createCellphone(result.data))
    }

    static modifyCellphone = async (req, res) => {
        const result = validateModifyCell(req.body);

        if(result.error) return res.status(400).json({error : JSON.parse(result.error.message)})

        const { id } = req.params;
        const cellphoneModified = await cellphoneModels.modifyCellphone({id, input: result.data});

        if (!cellphoneModified) return res.status(400).json({error : "Cellphone not found"});
        return res.json(cellphoneModified)
    }

    static deleteCellphone = async (req, res) => {
        const { id } = req.params;
        const deleteStatus = await cellphoneModels.deleteCellphone({id});

        if(!deleteStatus) return res.status(404).json({error : "Cellphone not found"})
        return res.status(200).json({message : "Cellphone delete successful"})
    }     
}