// import { ValidateScreen, ValidateModifyScreen } from "../schemas/schemasScreens.mjs";
import { ModelsScreens } from "../models/screens.mjs";

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
        const result = ValidateScreen(req.body)

        if(result.error) return res.json({error : JSON.parse(result.error.message)}).status(400)
        return res.json(await ModelsScreens.createScreen(result.data)).status(201)
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