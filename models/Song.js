const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must have a name"]
    },
    artist: {
        type: String,
        required: [true, 'Must have an artist']
    }
});

module.exports = mongoose.model("Song", SongSchema);