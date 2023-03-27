const express = require("express")
const path = require("path")


const app = express()
module.exports = app

const storage = require("./storage")
app.store = storage(path.join(__dirname, "/db/"))

app.get("/", (req, res) => {
    res.send("Hello World")
})
