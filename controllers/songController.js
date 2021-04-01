const Song = require("../models/Song");

exports.getSongs = async (req, res, next) => {
    try {
        let songs;
        if(req.query.title) {
            songs = await Song.find({title: req.query.title});
        } else {
            songs = await Song.find();
        }
        
        res.status(200).json({songs, requestedUser: req.userData});
    } catch (error) {
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
        const song = new Song({
            title: req.body.title,
            artist: req.body.artist
        });
        const addedSong = await Song.create(song);
        res.status(201).json({message: "Song added successfully", addedSong, requestedUser: req.userData});
    } catch (error) {
        res.status(400).json({message: "Request Failed"});
    }
}