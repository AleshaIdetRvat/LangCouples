const { Router } = require("express")
const authMiddleWare = require("../middleware/auth.middleware")

const getCouples = require("../src/parser/parser")
const router = Router()

router.get("/", async (req, res) => {
    try {
        if (!req.query.from || !req.query.to || !req.query.keyword) {
            return res
                .status(404)
                .json({ resultCode: 1, message: "Wrong querry params" })
        }

        const couples = await getCouples({
            langFrom: req.query.from,
            langTo: req.query.to,
            keyWord: req.query.keyword,
            lessonTheme: req.query.theme || false,
        }) // EXAMPLE http://localhost:5000/couples?from=russian&to=german&keyword=%D0%BF%D0%BE%D0%BA%D0%B0

        res.status(200).json(couples)
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: error.message })
    }
})

module.exports = router
