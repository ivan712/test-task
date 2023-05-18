const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const mongoose = require('mongoose');

module.exports.mustBeAuthorized = async function mustBeAuthorized(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw Error();
        const decodeData = jwt.verify(token, secret);

        req.userId = new mongoose.Types.ObjectId(decodeData.id);

        return next();
    } catch (err) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
    }
};
