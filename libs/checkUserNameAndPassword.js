const Blog = require('../models/Blog');
module.exports.checkUserNameAndPassword = async function checkUserNameAndPassword(req, res, next) {
    const { userName, password } = req.body;

    if (userName === undefined || password === undefined)
        return res.status(400).json({ message: "Невалиднре тело запроса" });

    if (userName.replaceAll(' ', '') === '' || password.replaceAll(' ', '') === '')
        return res.status(400).json({ message: "Имя пользователя и пароль не могут быть пустыми" });

    next();
};