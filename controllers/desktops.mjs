import { ACCEPTED_ORIGINS } from "../routes/routerAllTechno.mjs";
// import { ValidateDesktop, ValidateModifyDesktop } from "../schemas/schemasDesk.mjs";
import { ModelsDesktops } from "../models/desktops.mjs";

export class ControllerDesktops {

    static getAll = async (req, res) => {
        const origin = req.header("origin");

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        return res.json(await ModelsDesktops.getAll())
    }

    static getByid = async (req, res) => {
        const origin = req.header("origin")

        if (ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }
        
        const { id } = req.params
        const desktopPc = await ModelsDesktops.getByid({ id })
        
        if(desktopPc) return res.json(desktopPc)
        return res.json({error : "Desktop pc not found"}).status(404)
    }

    static createDesktopPc = async (req, res) => {
        const result = ValidateDesktop(req.body)

        if (result.error) return res.json({error : JSON.parse(result.error.message)}).status(400)
        
        return res.json(await ModelsDesktops.createDesktopPc(result.data)).status(201)
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
        const origin = req.header("origin")

        if (ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin")
        }
        
        const { id } = req.params
        const deleteStatus = await ModelsDesktops.deleteDesktopPc({ id })

        if (deleteStatus) return res.json({message : "Cellphone deleted successfully"})
        return res.json({error : "Desktop pc not found"})
    }
}