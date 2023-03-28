const express = require("express")
const path = require("path")


const app = express()
module.exports = app

const storage = require("./storage")
app.store = storage(path.join(__dirname, "/db/"))

app.use(express.json())

app.set("view engine", "ejs")

app.use("/assets", express.static(path.join(__dirname, "/assets")))

app.store.load()

app.get("/", (req, res) => {
    res.redirect("/login")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.post("/login", (req, res) => {
    const username = req.body.username

    if (!app.store.has(username)) {
        res.render("error", { status: 404, message: "User not found" })
    }

    res.redirect(`/u/${username}`)
})

app.post("/signup", (req, res) => {
    const username = req.body.username

    if (app.store.has(username)) {
        res.render("error", { status: 409, message: "User already exists" })
    }

    app.store.createUser(username, req.body.name || req.body.username)
    res.redirect(`/u/${username}`)
})

app.get("/u/:username", (req, res) => {
    const username = req.params.username

    if (!app.store.has(username)) {
        res.status(404).render("error", { status: 404, message: "User not found" })
        return
    }

    res.render("user", { username, user: app.store.get(username) })
})

app.get("/t/:username-:taskid", (req, res) => {
    const username = req.params.username
    const taskId = parseInt(req.params.taskid)

    if (isNaN(taskId)) {
        res.status(400).render("error", { status: 400, message: "Task ID must be \"username-number\"" })
        return
    }

    if (!app.store.has(username)) {
        res.status(404).render("error", { status: 404, message: "User not found" })
        return
    }

    const task = app.store.getUserTasks(username).find(t => t.id === taskId)
    if (!task) {
        res.status(404).render("error", { status: 404, message: "Task not found" })
        return
    }

    res.render("task", { username, task })
})
