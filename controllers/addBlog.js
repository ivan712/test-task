const Blog = require('../models/Blog');

module.exports.addBlog = async function addBlog(req, res, next) {
    const blog = new Blog({
        userId: req.userId,
        text: req.body.text,
        media: req.body.media
    });

    await blog.save();

    return res.json({ message: "Блог успешно добавлен" })
};