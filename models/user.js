const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['Femme', 'Homme', 'Autre'],
        required: true
    },
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
    job: { type: mongoose.Types.ObjectId, required: false }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
