const mongoose = require('mongoose');
const {mongoUrl}= require("./env");

const MongoConnect= async ()=>{
    try {
        await mongoose.connect(mongoUrl)
        .then(()=> console.log("MongoDB is connected"))
        .catch((err)=>console.error('Error',err));
    } catch (error) {
        console.error("Error",error);
        process.exit(1);
    }
}

module.exports = MongoConnect;
