const express = require("express")
const config = require("config")
const mongoose = require("mongoose")
const getCouples = require("./src/parser/parser")

const app = express()

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"])
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.append("Access-Control-Allow-Headers", "Content-Type")
    next()
}) // CORS
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: false })) // url params

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/link", require("./routes/link.routes"))
app.use("/t", require("./routes/redirect.routes"))

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (error) {
        console.log(`server error ${error}`)
        process.exit
    }
}

app.get("/couples", async (req, res) => {
    try {
        if (!req.query.from || !req.query.to || !req.query.keyword) {
            return res.status(404).json({ resultCode: 1, message: "Wrong querry params" })
        }
        const couples = await getCouples({
            langFrom: req.query.from,
            langTo: req.query.to,
            keyWord: req.query.keyword,
            lessonTheme: req.query.theme || false,
        }) // EXAMPLE http://localhost:5000/couples?from=russian&to=german&keyword=%D0%BF%D0%BE%D0%BA%D0%B0

        res.json(couples)
    } catch (error) {
        res.status(500).json({ resultCode: 1, message: "Something wrong" })
    }
})

const PORT = config.get("port") || 5000

start()

/*

const path = require("path")

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


*/
