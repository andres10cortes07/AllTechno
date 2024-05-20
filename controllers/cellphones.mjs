import { cellphoneModels } from "../models/cellphones.mjs";
import { validateCellphone, validateModifyCell } from "../schemas/schemasCell.mjs";


export class ControllerCellphones {

    static getAll = async (req, res) => {
        const cellphones = await cellphoneModels.getAll();
        res.json(cellphones)
    }

    static getById = async (req, res) => {
        const { id } = req.params;
        const cellphone = cellphoneModels.getById({ id });

        //! validar si en el caso de que si esté el celular mande un status 200
        if (cellphone) res.json(cellphone)
        else res.status(404).json({message: "Cellphone not found"})
    }

    static createCellphone = async (req, res) => {
        const result = validateCellphone(req.body);

        if (result.error) return res.status(400).json({error: JSON.parse(result.error.message)})

        const newCellphone = await cellphoneModels.createCellphone(result.data);
        res.status(201).json(newCellphone)
    }

    static modifyCellphone = async (req, res) => {
        const result = validateModifyCell(req.body);

        if(result.error) return res.status(400).json({error : "Error en la estructura"})

        const { id } = req.params;
        const cellphoneModified = await cellphoneModels.modifyCellphone({id, input: result.data});

        if (!cellphoneModified) return res.status(400).json({error : "Cellphone not found"});
        return res.status(200).json(cellphoneModified)
    }

    static deleteCellphone = async (req, res) => {
        const { id } = req.params;
        const deleteStatus = await cellphoneModels.deleteCellphone({id});

        if(!deleteStatus) return res.status(404).json({error : "Cellphone not found"})
        return res.status(200).json({message : "Cellphone delete successful"})
    }     
}