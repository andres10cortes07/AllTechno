import { ValidateDesktop, ValidateModifyDesktop } from "../schemas/schemasDesktops.mjs";
import { ModelsDesktops } from "../models/desktops.mjs";

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
        const result = ValidateDesktop(req.body)

        if (result.error) return res.status(400).json({error : JSON.parse(result.error.message)})
        
        return res.status(201).json(await ModelsDesktops.createDesktopPc(result.data))
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