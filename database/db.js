import mongoose from "mongoose";
const Connection=async(username,password)=>{
    const URL=`mongodb://${username}:${password}@ac-3gpfpna-shard-00-00.gj6tnzf.mongodb.net:27017,ac-3gpfpna-shard-00-01.gj6tnzf.mongodb.net:27017,ac-3gpfpna-shard-00-02.gj6tnzf.mongodb.net:27017/?ssl=true&replicaSet=atlas-p80mj1-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
    await mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true}) 
    console.log('Database Connected Successfully');    
}
    catch(error){
        console.log('Error while connecting to the Database ',error.message);
    }
}
export default Connection;