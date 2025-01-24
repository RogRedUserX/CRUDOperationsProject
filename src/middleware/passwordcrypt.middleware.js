import bcrypt from "bcrypt";

const passwordHash = async(req,res,next) =>{
    try{
        const saltRounds = 10;
        const userPassword = req.body.password;

        const hash = await bcrypt.hash(userPassword,saltRounds);
        req.body.password = hash;

    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
        next(err);
    }
    next();
}

export default passwordHash;