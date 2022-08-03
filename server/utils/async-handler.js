module.exports = (requrestHandler) => {
    return async (req, res, next) => {
        try { 
            await requrestHandler(req, res);
        } catch (err) {
            next(err);
        }
    }
}
