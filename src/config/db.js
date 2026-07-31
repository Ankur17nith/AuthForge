const mongoose = require('mongoose');

const MongoConnect= async ()=>{
    try {
        mongoose.connect("mongodb://127.0.0.1:27017")
        .then(()=> console.log("MongoDB is connected"))
        .catch((err)=>console.error('Error',err));
    } catch (error) {
        console.error("Error",error);
        process.exit(1);
    }
}

module.exports = MongoConnect;
