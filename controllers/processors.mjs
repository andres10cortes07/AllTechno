import { ACCEPTED_ORIGINS } from "../routes/routerAllTechno.mjs" 
// import { ValidateProcessor, ValidateModifyProcessor } from "../schemas/schemasProce.mjs";
import { ModelsProcessors } from "../models/processors.mjs";

export class ControllerProcessors {
    static getAll = async (req, res) => {
        const origin = req.header("origin");

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin);
        }

        const processors = await ModelsProcessors.getAll();
        return res.json(processors)
    }

    static getById = async (req, res) => {
        const origin = req.header("origin");
        const { id } = req.params;

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        const processor = await ModelsProcessors.getById({ id });

        if(processor) return res.json(processor)
        return res.json({error : "Processor not found"}).status(404)
    }

    static createProcessor = async (req, res) => {
        const result = ValidateProcessor(req.body);

        if(result.error) return res.json({error : JSON.parse(result.error.message)})

        const newProcessor = await ModelsProcessors.createProcessor(result.data);
        return res.json(newProcessor)
    }

    static modifyProcessor = async (req, res) => {
        const { id } = req.params
        const result = ValidateModifyProcessor(req.body)

        if(result.error) return res.json({error : JSON.parse(result.error.message)}).status(400);

        const ProcessorModified = await ModelsProcessors.modifyProcessor({ id, input:result.data});

        if (ProcessorModified) return res.json(ProcessorModified)
        return res.json({error : "Processor not found"}).status(404)
    }

    static deleteProcessor = async (req, res) => {
        const origin = req.header("origin");
        const { id } = req.params;

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        const deleteStatus = await this.deleteProcessor({id});
        if (deleteStatus) return res.json({message : "Processor deleted successfully"});
        return res.json({error : "Processor not found"})
    }
}