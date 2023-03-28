const express = require("express")
const path = require("path")


const app = express()
module.exports = app

const storage = require("./storage")
app.store = storage(path.join(__dirname, "/db/"))

app.set("view engine", "ejs")

app.use("/assets", express.static(path.join(__dirname, "/assets")))

app.store.load()

app.get("/", (req, res) => {
    res.json(app.store._currentData)
})
