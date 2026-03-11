const {mongodb} = require('./env');

const mongoose=require('mongoose');


async function connectDb(){
    try {
         await mongoose.connect(mongodb, {
        })
        console.log('CONNECTED TO MONGODB SUCCESSFULLY! 🟢')  
    } catch (error) {
        console.log("FAILED TO CONNECT TO MONGO DB 🔴",error );
    }    

}

module.exports=connectDb;