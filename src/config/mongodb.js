import { MongoClient } from "mongodb";


let client;
export async function connectToMongoDB(){
    
    const url = "mongodb+srv://newadmin1:cyldeqP8wFC0loEi@ngotest.rsxzr.mongodb.net/?retryWrites=true&w=majority&appName=NGOTest";


    client = new MongoClient(url);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        console.log("mongodb is connected")

    } catch (err) {
        console.error(err);
    }
}


export const getDB = () => {
    return client.db();
}
