const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (request, response, next) => {
    if (request.method === "OPTIONS") {
        return next()
    }
    try {
        const token = request.headers.authorization.split(" ")[1] // "Bearer TOKEN"

        if (!token) {
            return response.status(401).json({ message: "No authorized !token" })
        }

        const decodedUserData = jwt.verify(token, config.get("jwtSecret"))

        request.user = decodedUserData // = { token, userId }

        next()
    } catch (error) {
        return response
            .status(401)
            .json({ message: "No authorized catch, error: " + error.message })
    }
}
