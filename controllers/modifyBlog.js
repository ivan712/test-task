const Blog = require('../models/Blog');

module.exports.modifyBlog = async function modifyBlog(req, res) {
    const { id, text, media } = req.body;
    const update = { text, media };

    await Blog.findOneAndUpdate({ _id: id }, update, {
        returnOriginal: false
    })

    res.json({ message: "Блог успешно обновлён" });
};