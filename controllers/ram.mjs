import { ACCEPTED_ORIGINS } from "../routes/routerAllTechno.mjs";
// import { ValidateRam, ValidateModifyRam } from "../schemas/schemasRam.mjs";
import { ModelsRam } from "../models/ram.mjs";

export class ControllerRam {

    static getAll = async (req, res) => {
        const origin = req.header("origin");

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        return res.json(await ModelsRam.getAll())
    }

    static getById = async (req, res) => {
        const origin = req.header("origin")
        const { id } = req.params

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        const ram = await ModelsRam.getById({ id });

        if(ram) return res.json(ram)
        return res.json({error : "Ram not found"}).status(404)
    }

    static createRam = async (req, res) => {
        const result = ValidateRam(req.body)

        if(result.error) return res.json({error : JSON.parse(result.error.message)}).status(400)
        return res.json(await ModelsRam.createRam(result.data)).status(201)
    }

    static modifyRam = async (req, res) => {
        const result = ValidateModifyRam(req.body);
        const {id} = req.params

        if (result.error) return res.json({error : JSON.parse(result.error.message)}).status(400)

        const ramModified = await ModelsRam.createRam({id, input:result.data}) 
        
        if (ramModified) return res.json(ramModified)
        return res.json({error : "Ram not found"}).status(404)
    }

    static deleteRam = async (req, res) => {
        const origin = req.header("origin")
        const {id} = req.params

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        const deleteStatus = await ModelsRam.deleteRam({id})
        
        if(deleteStatus) return res.json({message : "Ram deleted successfully"})
        return res.json({error : "Ram not found"}).status(404)
    }
}