import express from "express";

export const invaildRoutesHandlerMiddleware = (req,res,next) => {
    res.status(404).send("API not found");
    next();
}
