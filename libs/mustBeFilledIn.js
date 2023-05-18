module.exports.mustBeFilledIn = async function mustBeFilledIn(req, res, next) {
    const { text, media } = req.body;

    if ((text === undefined) || (media === undefined) )
        return res.status(400).json("Невалидное тело запроса");
    
    if (text.replaceAll(' ', '') === '' && media.replaceAll(' ', '') === '')
        return res.status(400).json("Блог не может быть пустым");

    next()
};