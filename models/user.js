const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    birthday: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['Client', 'Fournisseur', 'Administrateur'],
        required: true
    },
    job: { type: String, required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
