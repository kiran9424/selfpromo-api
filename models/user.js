const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    name: {
        type: String,
        required: [true, 'name is required'],
        minlength: [3, 'Too short, min is 6 characters']
    },
    password: {
        type: String,
        minlength: [4, 'Too short, min is 4 characters'],
        maxlength: [32, 'Too long, max is 32 characters'],
        required: [true, 'Password is required']
    },
    confirmPassword: {
        type: String,
        minlength: [4, 'Too short, min is 4 characters'],
        maxlength: [32, 'Too long, max is 32 characters'],
        required: [true, 'confirm password is required']
    },
    role: {
        enum: ['guest', 'admin'],
        type: String, required: true, default: 'guest'
    },
    info: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined;
    next()
})

userSchema.methods.comparePassword = async function(userEnteredPassword,hashedPassword){
   return await bcrypt.compare(userEnteredPassword,hashedPassword);
}
module.exports = mongoose.model('User', userSchema)