import {body, validationResult} from "express-validator";




const validationRegister = async (req, res, next) => {
    const rules = [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Email should be vaild"),
        body("password").notEmpty().withMessage("Password is required")
    ];

    await Promise.all(rules.map(rule=>rule.run(req)));
    var validationErrors = validationResult(req);
    try{
        if(!validationErrors.isEmpty()){
            return res.status(400).send("name, email or password is required");
        }
    }catch(err){
        console.log(err);
        next(err);
    }
    next();    
}

export default validationRegister;