import { getDB,connectToMongoDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../middleware/applicationerror.middleware.js";
import { ObjectId } from "mongodb";

export default class crudRepository{
    constructor(){
        this.collection = "crud"
    }

    async getAll(next){
        try{
            await connectToMongoDB()
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.find().toArray();
            if(!result){
                throw new ApplicationError("There is no quotes available", 404);
            }
            return result;
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async getbyId(id,next){
        try{
            await connectToMongoDB()
            const db = getDB();
            const collection = db.collection(this.collection);
            if(ObjectId.isValid(id)){
                var objectids = new ObjectId(id);
            }else{
                const error = new ApplicationError("Invalid postId", 400);
                return next(error);
            }
            const result = await collection.find({_id:objectids}).toArray();
            if(!result){
                throw new ApplicationError("There is no quotes available for this Id", 404);
            }
            return result;
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async create(post,next){
        try{
            await connectToMongoDB()
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.insertOne(post);
            const actualresult = await collection.findOne({quote:post.quote});
            return actualresult;
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async updatebyId(newquote,postId,next){
        try{
            await connectToMongoDB()
            const db = getDB();
            const collection = db.collection(this.collection);
            if(ObjectId.isValid(postId)){
                var objectid = new ObjectId(postId);
            }
            const isexist = await collection.findOne({_id:objectid});
            if(!isexist){
                const error = new ApplicationError("There is no quotes available to update for this id or invaild id",404);
                return next(error);
            }
            const result = await collection.replaceOne({_id:objectid},newquote);
            const actualresult = await collection.findOne({_id:objectid});
            return actualresult;
        }catch(err){
            console.log(err);
            next(err);
        }
    }

    async deletebyId(postId, next) {
        try {
          await connectToMongoDB()
          const db = getDB();
          const collection = db.collection(this.collection);
          if(ObjectId.isValid(postId)){
            var objectiid = new ObjectId(postId);
          }else{
            const error = new ApplicationError("Invalid postId", 400);
            return next(error);
          }

      
          const result = await collection.deleteOne({ _id: objectiid });
          if (result.deletedCount === 1) {
            return "Post deleted successfully";
          } else {
            const error = new ApplicationError("Post not found or unauthorized", 401);
            return next(error);
          }
        } catch(err) {
          console.error(err);
          next(err);
        }
    }
}
