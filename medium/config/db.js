const mongoose=require('mongoose')
/**const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(connectDB)
        console.log('mongodb connected')
    }catch(error){
        console.error('mongodb not connected',error.message)
        process.exit(1);
    }
};*/
//module.exports=connectDB
async function connectDB(params) {
    try{
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(conn)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
    
}
module.exports=connectDB