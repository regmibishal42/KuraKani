const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        // required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFY7ltALufnd2KT1pKEWz-B4XX9LZhNYbp7WvpavXBJ-gk3DEygUbw4pX9QyP69JIHKsw&usqp=CAU"
    }

}, {timestamps: true});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

const User = mongoose.model("User",userSchema);

module.exports = User;
