const mongoose = require('mongoose');


const connectDb = async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('Connected To Mongodb',conn.connection.host)

    }catch(error){
            console.log(`Database connection error : ${error.message}`)
            process.exit();
    }
}

module.exports = connectDb;