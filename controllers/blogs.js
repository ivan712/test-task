const Blog = require('../models/Blog');

const limit = 20;

function blogsMapper(pageTotalAmount, blogs) {
    return {
        pageTotalAmount,
        blogs: blogs.map(blog => {
            return {
                id: blog._id,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
                author: blog.userId.name,
                userId: blog.userId._id,
                message: {
                    text: blog.text,
                    media: blog.media
                }
            }
        })
    }
}

module.exports.blogs = async function blogs(req, res, next) {
    let page = +req.query.page;

    if (page === NaN || page <= 0 || !Number.isInteger(page))
        return res.status(400).json({ message: 'Невалидный номер страницы' });

    page--;

    const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(limit * page)
        .populate('userId');

    const blogsTotalAmount = await Blog.find().count()
    const pageTotalAmount = Math.ceil(blogsTotalAmount / limit);

    res.json(blogsMapper(pageTotalAmount, blogs))
}