const { Schema, model } = require("mongoose")

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    langs: {
        from: { type: String, default: null },
        to: { type: String, default: null },
    },
    exercises: {
        completed: { type: Number, default: 0 },
        solved: { type: Number, default: 0 },
    },
})

module.exports = model("User", schema)
