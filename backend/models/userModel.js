const mongoose = require('mongoose');

const UserModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFY7ltALufnd2KT1pKEWz-B4XX9LZhNYbp7WvpavXBJ-gk3DEygUbw4pX9QyP69JIHKsw&usqp=CAU"
    }

}, {timestamps: true});

const User = mongoose.model("User",UserModel);

module.export = User;
