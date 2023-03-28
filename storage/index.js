const fs = require("fs")
const path = require("path")

const DEFAULT_USER = {
    username: "unknown_user",
    name: "Unknown User",
    tasks: []
}

module.exports = function storage(savePath) {
    return {
        savePath,
        _currentData: {},
        load() {
            const files = fs.readdirSync(savePath)

            for (const file of files) {
                const filePath = path.join(savePath, file)
                const data = JSON.parse(fs.readFileSync(filePath))
                this._currentData[filePath.replace(".json", "")] = data
            }
        },
        save(user) {
            const filePath = path.join(savePath, user + ".json")
            fs.writeFileSync(filePath, JSON.stringify(this._currentData[user]))
        },
        commit() {
            for (const user in this._currentData) {
                this.save(user)
            }
        },
        createUser(username, name) {
            this._currentData[username] = {
                username,
                name,
                tasks: []
            }
            this.save(username)
        },
        get(user) {
            return this._currentData[user] || DEFAULT_USER
        },
        getUserTasks(user) {
            return this._currentData[user].tasks
        },
        getAllTasks() {
            return Object.values(this._currentData).map(user => user.tasks).reduce((a, b) => a.concat(b), [])
        },
        add(user, title, { description, due }) {
            const task = {
                id: generateTaskID(),
                title,
                ...{
                    description,
                    due
                }
            }
            this._currentData[user].tasks.push(task)
            this.save(user)
            return task
        },
        update(user, id, updates) {
            const task = this._currentData[user].tasks.find(task => task.id === id)
            if (task) {
                Object.assign(task, updates)
                this.save(user)
                return task
            }
            return null
        },
        delete(user, id) {
            this._currentData[user].tasks = this._currentData[user].tasks.filter(task => task.id !== id)
            this.save(user)
        }
    }
}

function generateTaskID() {
    return Math.ceil(Math.random() * 1000000)
}
