const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    verified: {
        type: Boolean,
        default: false,
        required: true
    }

}, {
    timestamps: true
})


userSchema.methods.verifyEmail = async function () {
    const user = this
    user.verified = true
    await user.save()

}

module.exports = mongoose.model('User', userSchema)

