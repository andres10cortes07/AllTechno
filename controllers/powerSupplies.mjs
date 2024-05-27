import { ACCEPTED_ORIGINS } from "../routes/routerAllTechno.mjs";
import { ModelsPowerSupplies } from "../models/powerSupplies.mjs";
// import { ValidatePowerSupply, ValidateModifyPowerSupply } from "../schemas/schemasPowerS.mjs"

export class ControllerPowerSupplies {

    static getAll = async (req, res) => {
        const origin = req.header("origin");

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        const powerSupplies = await ModelsPowerSupplies.getAll();
        return res.json(powerSupplies)
    }

    static getById = async (req, res) => {
        const origin = req.header("origin") ;
        const { id } = req.params

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        const powerSupply = await ModelsPowerSupplies.getById({id})

        if (powerSupply) return res.json(powerSupply)
        return res.json({error : "Power Supply not found"}).status(404)
    }

    static createPowerSupply = async (req, res) => {
        const result = ValidatePowerSupply(req.body);

        if(result.error) return res.json({error: result.error.message})

        const PowerSupplyModified = await ModelsPowerSupplies.createPowerSupply(result.data)
        if(PowerSupplyModified) return res.json(PowerSupplyModified)
    }

    static modifyPowerSupply = async (req, res) => {
        const result = ValidateModifyPowerSupply(req.body);
        const id = req.params;

        if(result.error) return res.json({error: result.error.message})
        const PowerSupplyModified = await ModelsPowerSupplies.createPowerSupply({ id, input:result.data })

        if(PowerSupplyModified) return res.json(PowerSupplyModified)
        return res.json({error: "Power Supply not found"}).status(404)
    }

    static deletePowerSupply = async (req, res) => {
        const { id } = req.params
        const origin = req.header("origin");

        if(ACCEPTED_ORIGINS.includes(origin)){
            res.header("Access-Control-Allow-Origin", origin)
        }

        const elimination = await ModelsPowerSupplies.deletePowerSupply({ id });
        
        if (elimination) return res.json({message: "Power Supply delete successfully"})
        return res.json({error : "Power Supply not found"}).status(404)
    }
}