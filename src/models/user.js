const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    email:{
        type:String,
        required: true,
        unique: true,

    },
    password:{
        type:String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    updatedAt:{
        type: Date,
    }
})

UserSchema.pre("save", async function(next){
    if(!this.isModified('password')) return;
    
    const salt=await bcrypt.genSalt(10);
    this.password =await bcrypt.hash(this.password, salt);

    next();
})

UserSchema.methods.comparePassword =async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

const user = mongoose.model('user', UserSchema);

module.exports = user;
