const Artist = require("../models/Artist");
const Song = require("../models/Song");

exports.getSongs = async (req, res, next) => {
    try {
        let songs;
        if(req.query.title) {
            songs = await Song.find({title: req.query.title}).populate("artist", "name");
        } else {
            songs = await Song.find().populate("artist", "name");
        }
        
        res.status(200).json({songs, requestedUser: req.userData});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Request Failed"});
    }
}

exports.getSong = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.id);
        res.status(200).json({song, requestedUser: req.userData});
    } catch (error) {
        res.status(400).json({message: "Request Failed"});
    }
}

exports.addSong = async (req, res, next) => {
    try {
        let artist = await Artist.findOne({name: req.body.artist});
        let song;
        if(artist) {
            song = new Song({
                title: req.body.title,
                artist: artist
            });
            
        } else {
            artist = new Artist({
                name: req.body.artist
            });
            song = new Song({
                title: req.body.title,
                artist: artist
            });
        }
        
        const addedSong = await Song.create(song);
        artist.songs.push(addedSong);
        await artist.save();
        
        res.status(201).json({
            message: "Song added successfully", 
            addedSong : {
                id: addedSong.id,
                title: addedSong.title
            },
            requestedUser: req.userData
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Request Failed"});
    }
}