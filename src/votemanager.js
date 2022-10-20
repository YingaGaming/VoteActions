const mongo = require('./mongo')
const minecraft = require('minecraft-api')
const rcon = require('./rcon')
const fetch = require('cross-fetch')
const config = require('../config')

let runAction = async(username, action, data) => {
    for (let command of action.commands) {
        rcon.send(
            command
            .split('%player%').join(username)
            .split('%count%').join(data.count)
            .split('%total%').join(data.total)
            .split('%uuid%').join(data.uuid)
        )
    }

    if (action.custom) {
        action.custom(username, data)
    }

    if (action.discord && config.discordWebhook) {

        let payload = JSON.stringify(action.discord)
            .split('%player%').join(username)
            .split('%count%').join(data.count)
            .split('%total%').join(data.total)
            .split('%uuid%').join(data.uuid)
            .split('%avatar%').join(`https://crafatar.com/avatars/${data.uuid}`)
            .split('%timestamp%').join((new Date()).toISOString())

        fetch(config.discordWebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload
        })
    }

}

module.exports.vote = async(username) => {

    let uuid

    await minecraft.uuidForName(username)
        .then(x => uuid = x)
        .catch(() => {
            if (!config.checkUUID) uuid = username
        })

    if (!uuid) return

    let data = await mongo.queryOne('Votes', { uuid: uuid })

    if (!data) {
        data = {
            uuid: uuid,
            count: 0,
            last: 0,
            total: 0,
            lastReset: 0
        }
        await mongo.insert('Votes', data)
    }

    data.last = Date.now()
    data.total += 1

    if (data.lastReset <= Date.now() - (config.timeframe * 24 * 60 * 60 * 1000)) {
        data.count = 0
        data.lastReset = Date.now()
    }

    data.count += 1

    if (config.actions[data.count]) {
        runAction(username, config.actions[data.count], data)
    } else if (config.actions[0]) {
        runAction(username, config.actions[0], data)
    }

    mongo.update('Votes', { uuid: uuid }, data)

}