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
                this._currentData[path.basename(filePath).replace(".json", "")] = data
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
        has(username) {
            return this._currentData.hasOwnProperty(username)
        },
        get(username) {
            return this._currentData[username] || DEFAULT_USER
        },
        getUserTasks(username) {
            return this._currentData[username].tasks
        },
        getAllTasks() {
            return Object.values(this._currentData).map(user => user.tasks).reduce((a, b) => a.concat(b), [])
        },
        add(username, title, { description, due }) {
            const task = {
                id: generateTaskID(),
                title,
                ...{
                    description,
                    due
                }
            }
            this._currentData[username].tasks.push(task)
            this.save(username)
            return task
        },
        update(username, taskId, updates) {
            const task = this._currentData[username].tasks.find(task => task.id === taskId)
            if (task) {
                Object.assign(task, updates)
                this.save(username)
                return task
            }
            return null
        },
        delete(username, taskId) {
            this._currentData[username].tasks = this._currentData[username].tasks.filter(task => task.id !== taskId)
            this.save(username)
        }
    }
}

function generateTaskID() {
    return Math.ceil(Math.random() * 1000000)
}
