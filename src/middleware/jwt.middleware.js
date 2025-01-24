import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next) => {
    try{
        const authHeader = req.cookies?.jwtToken;
        if(!authHeader){
            return res.status(401).send("unauthorized");
        }
        const {jwtToken} = req.cookies;
        const authStatus = jwt.verify(jwtToken, "uj_IPlp^A{x%qy$");
        req.userId = authStatus.userId;
        next();
    }catch(err){
        console.log(err);
        res.status(401).send("unauthorized");
    }
}

export default jwtAuth;