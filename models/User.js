const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must have a name"]
    },
    email: {
        type: String,
        required: [true, 'Must have an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is requires']
    }
});

UserSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("User", UserSchema);