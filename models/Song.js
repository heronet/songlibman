const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must have a name"],
        unique: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: [true, 'Must have an artist']
    }
});

SongSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("Song", SongSchema);