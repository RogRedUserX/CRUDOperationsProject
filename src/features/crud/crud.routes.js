import crudController from "./crud.controller.js";
import express from "express";
import jwtAuth from "../../middleware/jwt.middleware.js";
import validationCrud from "../../middleware/validation.crud.js";


const crudRoutes = express.Router();
const crudcontroller = new crudController();


crudRoutes.get("/all", (req,res,next)=>{
    crudcontroller.getAll(req,res,next)
});

crudRoutes.get("/byid/:id", (req,res,next)=>{
    crudcontroller.getbyId(req,res,next)
});

crudRoutes.post("/create", jwtAuth , validationCrud , (req,res,next)=>{
    crudcontroller.create(req,res,next)
});

crudRoutes.put("/update/:id", jwtAuth ,(req,res,next)=>{
    crudcontroller.updatebyId(req,res,next)
});

crudRoutes.delete("/delete/:id", jwtAuth ,(req,res,next)=>{
    crudcontroller.deletebyId(req,res,next)
});

export default crudRoutes;