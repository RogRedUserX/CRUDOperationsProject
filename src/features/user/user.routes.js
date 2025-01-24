import express from "express";
import userController from "./user.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";
import validationRegister from "../../middleware/validation.registerinput.js";
import validationLogin from "../../middleware/validation.logininput.js";
import passwordHash from "../../middleware/passwordcrypt.middleware.js"; 

const userRoutes = express.Router();
const usercontroller = new userController();

userRoutes.post("/signup",validationRegister, passwordHash ,(req,res,next)=>{
    usercontroller.registration(req,res,next)
});
userRoutes.post("/signin", validationLogin ,(req,res,next)=>{
    usercontroller.login(req,res,next)
});
userRoutes.get("/logout", jwtAuth,(req,res,next)=>{
    usercontroller.logout(req,res,next)
});


export default userRoutes;