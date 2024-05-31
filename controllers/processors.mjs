// import { ValidateProcessor, ValidateModifyProcessor } from "../schemas/schemasProce.mjs";
import { ModelsProcessors } from "../models/processors.mjs";

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
        const result = ValidateProcessor(req.body);

        if(result.error) return res.json({error : JSON.parse(result.error.message)})
        return res.json(await ModelsProcessors.createProcessor(result.data)).status(201)
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