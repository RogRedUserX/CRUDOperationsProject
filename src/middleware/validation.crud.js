import { body, validationResult } from "express-validator";

const validationCrud = async(req,resizeBy,next) =>{
    const rules = [
        body("quote").notEmpty().withMessage("quote is required")
    ];

    await Promise.all(rules.map(rule=>rule.run(req)));

    var validationCrudError = validationResult(req);

    try{
        if(!validationCrudError.isEmpty()){
            return res.status(400).send("quote is required");
        }
    }catch(err){
        console.log(err);
        next(err);
    }
    next();

}

export default validationCrud;