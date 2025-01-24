import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async registration(req,res,next){
        try{
            const {name,email,password} = req.body;
            const newUser = new UserModel(name,email,password);
            const result = await this.userRepository.registration(newUser,next);
            res.status(201).send(result);
        }catch(err){
            console.log(err);
            next(err);
        }     
    }

    async login(req,res,next){
        try{
            const {email,password} = req.body; 
            const result = await this.userRepository.login(email,password,next);
            if(result){
                const token = jwt.sign(
                {    
                    userId:result._id.toString(),
                    email:result.email,
                },
                "uj_IPlp^A{x%qy$",
                { expiresIn: "1h" }
                );
                result.token = token;
                res.status(200).cookie("jwtToken",token, {maxAge: 900000, httpOnly:false}).send(result);
            }  
        }catch(err){
            next(err);
        }       
    }

    async logout(req,res,next){
        try{
            const userId = req.userId;
            if(!userId){
                throw new ApplicationError("Login first to logout", 400);
            }
            res.clearCookie("jwtToken");
            res.status(200).send("Logout Successfully");
        }catch(err){
            console.log(err);
            next(err);
        } 
    }
}
