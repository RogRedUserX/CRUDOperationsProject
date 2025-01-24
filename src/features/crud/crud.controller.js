import crudModel from "./crud.model.js";
import crudRepository from "./crud.repository.js";


export default class crudController{
    
    constructor(){
        this.crudRepository = new crudRepository();
    }

    async getAll(req,res,next){
        try{
            const result = await this.crudRepository.getAll(next);
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async getbyId(req,res,next){
        try{
            const id = req.params.id;
            const result = await this.crudRepository.getbyId(id,next);
            res.status(200).send(result);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async create(req,res,next){
        try{
            const post = req.body;
            const result = await this.crudRepository.create(post,next);
            res.status(201).send(result);
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async updatebyId(req,res,next){
        try{
            const postId = req.params.id;
            const {quote} = req.body;
            const newquote = new crudModel(quote);
            const result = await this.crudRepository.updatebyId(newquote,postId,next);
            res.status(200).send(result); 
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async deletebyId(req,res,next){
        try{
            const postId = req.params.id;
            const result = await this.crudRepository.deletebyId(postId,next);
            if(result){
                res.status(200).send(result); 
            }
            
        }catch(err){
            console.log(err);
            next(err);
        }
    }
}
