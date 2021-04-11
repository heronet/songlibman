const Artist = require("../models/Artist")

exports.getArtists = async (req, res, next) => {
    const artists = await Artist.find().populate("songs");

    res.status(200).json(artists);
}
exports.getArtist = async (req, res, next) => {
   try {
        const artist = await Artist.findById(req.params.id).populate("songs");

        res.status(200).json(artist);
   } catch (error) {
       console.log(error);
       res.status(400).json(error);
   }
}
exports.addArtist = async (req, res, next) => {
   try {
        const artist = new Artist({
            name: req.body.name
        });
        await artist.save();

        res.status(201).json(artist);
   } catch (error) {
       console.log(error);
       res.status(400).json(error);
   }
}