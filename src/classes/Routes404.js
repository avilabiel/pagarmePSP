class Routes404 {

    constructor() {}

    invalidRoute404(req, res, next) {
        res.status(404).send({message: "Invalid route!"})
    }
}

module.exports = new Routes404