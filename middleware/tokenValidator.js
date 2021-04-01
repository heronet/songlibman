const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(token) {
            const { email, id } = jwt.verify(token, process.env.JWT_KEY);
            req.userData = { email, id };
            next();
        } else {
            return res.status(401).json({message: "Authorization Failed"});
        }
    } catch (error) {
        return res.status(400).json({message: "Bad Request"});
    }
}