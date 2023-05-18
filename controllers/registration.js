const User = require('../models/User');

module.exports.registration = async function login(req, res) {
    const { userName, password } = req.body;
    let u = await User.findOne({ name: userName });

    if (u) {
        return res.status(400).json({ message: "Пользователь уже существует" })
    }

    u = new User({
        name: userName,
    });

    await u.setPassword(password);
    await u.save();

    return res.json({message: "Пользователь успешно зарегистрирован"});
}