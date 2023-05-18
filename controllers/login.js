const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id) => {
    const payload = {
        id
    };

    return jwt.sign(payload, secret, { expiresIn: "24h"});
}

module.exports.login = async function login(req, res) {
    const { userName, password } = req.body;

    let u = await User.findOne({ name: userName });

    if (!u) {
        return res.status(400).json({ message: "Пользователь не найден" })
    }

    const isValidPassword = await u.checkPassword(password);

    if (!isValidPassword) return res.status(400).json({ message: "Неверные данные пользователя" });

    const token = generateAccessToken(u._id);
    return res.json({token});
}