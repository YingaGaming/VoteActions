const mongo = require('./mongo')
const minecraft = require('minecraft-api')
const rcon = require('./rcon')
const config = require('../config')

let runCommands = async (username, action, data) => {
    for (let command of action.commands) {
        rcon.send(
            command
                .split('%player%').join(username)
                .split('%count%').join(data.actions[action.id].count)
                .split('%total%').join(data.total)
        )
    }
}

module.exports.vote = async(username) => {

    let uuid = await minecraft.uuidForName(username).catch(() => { return })

    if (!uuid) return

    let data = await mongo.queryOne('Votes', { uuid: uuid })

    if (!data) {
        data = {
            uuid: uuid,
            last: 0,
            total: 0,
            actions: {}
        }
        await mongo.insert('Votes', data)
    }

    data.last = Date.now()
    data.total += 1

    for (let action of config.actions) {

        if (!data.actions[action.id]) data.actions[action.id] = {
            count: 0,
            lastReset: 0
        }

        if (data.actions[action.id].lastReset <= Date.now() - (action.timeframe * 24 * 60 * 60 * 1000)) {
            data.actions[action.id].count = 0
            data.actions[action.id].lastReset = Date.now()
        }

        data.actions[action.id].count += 1

        if (data.actions[action.id].count == action.count) {
            runCommands(username, action, data)
            data.actions[action.id].count = 0
            data.actions[action.id].lastReset = Date.now()
        }

    }

    mongo.update('Votes', {uuid: uuid}, data)

}