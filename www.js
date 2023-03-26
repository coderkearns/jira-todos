const app = require("./index")

const PORT = parseInt(process.env.PORT || 3000)

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

process.on("SIGINT", () => {
    console.log("\b\bClosing server")
    server.close(() => {
        console.log("Server closed")
        process.exit(0)
    })
})
