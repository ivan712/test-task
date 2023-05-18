const express = require('express');
const { blogs } = require('./controllers/blogs');
const { registration } = require('./controllers/registration');
const { login } = require('./controllers/login');
const { addBlog } = require('./controllers/addBlog');
const { modifyBlog } = require('./controllers/modifyBlog')
const { mustBeAuthorized } = require('./libs/mustBeAuthorized');
const { mustBeFilledIn } = require('./libs/mustBeFilledIn');
const { checkUsersBlog } = require('./libs/checkUsersBlog');
const { checkUserNameAndPassword } = require('./libs/checkUserNameAndPassword');
const { deleteBlog } = require('./controllers/deleteBlog');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/openapi.json');

const app = express();

app.use(express.json());


app.get('/blogs', blogs);
app.post('/register', checkUserNameAndPassword, registration);
app.post('/login', checkUserNameAndPassword, login);
app.post('/addblog', mustBeAuthorized, mustBeFilledIn, addBlog);
app.post('/modifyblog', mustBeAuthorized, mustBeFilledIn, checkUsersBlog, modifyBlog);
app.delete('/deleteblog', mustBeAuthorized, checkUsersBlog, deleteBlog);

app.use((error, req, res, next) => {
        res.status(500).json({ message: "Ошибка сервера" })
    }
)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
