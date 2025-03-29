const napiHandler = require('./napi');
const skiaHandler = require('./skia');

module.exports = async (req, res) => {
    const { type } = req.query;

    try {
        if (type === 'skia') {
            return await skiaHandler(req, res);
        } else {
            return await napiHandler(req, res);
        }
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};
