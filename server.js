const routes = require('./routes')

//重新命名
const app = async (req, res) => {
    routes(req, res)
}

module.exports = app;