const { Router } = require("express")
const router = Router()
const authMiddleWare = require("../middleware/auth.middleware")
const User = require("../models/User")

router.put("/langs", authMiddleWare, async (req, res) => {
    try {
        const langs = req.body

        if (langs.from === langs.to)
            return res.status(400).json({ message: "Languages must be different" })

        const user = await User.findById(req.user.userId)

        if (!user) return res.status(400).json({ message: "User not found" })

        user.langs = langs

        await user.save()

        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ message: "Something wrong , ERROR: " + error.message })
    }
})

module.exports = router
