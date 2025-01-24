// External imports
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Internal imports
import { connectToMongoDB } from "./src/config/mongodb.js";
import crudRoutes from "./src/features/crud/crud.routes.js";
import userRoutes from "./src/features/user/user.routes.js";
import {ApplicationErrorMiddleware} from "./src/middleware/applicationerror.middleware.js";
import jwtAuth from "./src/middleware/jwt.middleware.js";
import { invaildRoutesHandlerMiddleware } from "./src/middleware/invaildurl.middleware.js";



// Creating server using express.js
const app = express();

// Using cors for Cross-Origin Resource Sharing, for parasing JSON use json and cookie parsing using cookieParser
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

// Welcome message 
app.get("/", (req, res) => {
    res.json({
      message: "Welcome to my API! Use /endpoint to interact with the API.",
      endpoints: {
        registration: "/user/signup",
        login: "/user/signin",
        logout: "/user/logout",
        create: "/create",
        update: "/update/:id",
        delete: "/delete/:id",
        getall: "/all",
        getbyid: "/byid/:id"
      }
    });
  });


// Declared all routes
app.use("/",crudRoutes);
app.use("/user",userRoutes);

// Used for handling error application level as well as invalid routes 
app.use(invaildRoutesHandlerMiddleware);
app.use(ApplicationErrorMiddleware);

// server listening on port 3000
app.listen(3000,()=>{
    console.log("server is listening on port 3000")
    connectToMongoDB();
})

export default app;
