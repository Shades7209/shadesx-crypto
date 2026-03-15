const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: [true,"Email is already in use"],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.[a-zA-Z]{2,}$/, "Invalid email address"]

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        match: [
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "Password must be 8+ chars and include letter, number & special character"
        ]
    },
    otp:String,
    expire:Date
})

const tempUserModel = mongoose.model("tempUser", tempUserSchema);

module.exports = { tempUserModel };
