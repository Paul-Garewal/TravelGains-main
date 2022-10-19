module.exports = func => (req, res, next) => {
    return func(req, res, next).catch(next);
}