const Blog = require('../models/Blog');
const { mongoose } = require('mongoose');

module.exports.checkUsersBlog = async function checkUsersBlog(req, res, next) {
    const { id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ message: "Невалидный идентификатор блога" });

    const blog = await Blog.findById({ _id: id });

    if (!blog)
        return res.status(404).json({ message: "Блог не найден" });

    if (!blog.userId.equals(req.userId))
        return res.status(400).json({ message: "Вы не являйтесь автором данного блога" });

    next();
};