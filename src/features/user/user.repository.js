import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import bcrypt from "bcrypt";

export default class UserRepository{

    constructor(){
        this.collection = "users";
    }

    async registration(newUser,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.insertOne(newUser);
            const actualresult = await collection.findOne({email:newUser.email})
            const insertDocument = actualresult;
            delete insertDocument.password;
            return insertDocument; 
        }catch(err){
            console.log(err);
            // throw new Error("something went wrong");
            next(err);
        }    
    }

    async login(email, password,next){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            const isemail = await collection.findOne({email:email});
            if (!isemail){
                throw new ApplicationError("invalid credentials", 401);
            }

            const result = await bcrypt.compare(password,isemail.password);

            if (!result){
                throw new ApplicationError("invalid credentials", 401);
            }

            const insertDocument = isemail;
            delete insertDocument.password;
            return insertDocument;
        }catch(err){
            // throw new Error("something went wrong");
            next(err);
        }     
    }
}