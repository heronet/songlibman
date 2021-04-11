const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must have a name"],
        unique: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        },
        
    ]
});

ArtistSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("Artist", ArtistSchema);