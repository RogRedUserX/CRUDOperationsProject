import express from "express";

export class ApplicationError extends Error {
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const ApplicationErrorMiddleware = (err,req,res,next) => {
    if(err instanceof ApplicationError){
        res.status(err.statusCode).send(err.message);
    }else{
        res.status(500).send("Internal Server error try again later");
    }
    next();
}
