const Blog = require('../models/Blog');

module.exports.deleteBlog = async function deleteBlog(req, res) {
    const { id } = req.body;
    await Blog.findOneAndDelete({ _id: id });

    return res.json({ message: "Блог успешно удалён" })
};