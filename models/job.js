const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }
});

jobSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Job', jobSchema);
