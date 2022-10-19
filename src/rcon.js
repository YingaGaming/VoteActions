const { RCONClient } = require('@minecraft-js/rcon')
const config = require('../config')

let client = new RCONClient(config.rcon.host, config.rcon.password, config.rcon.port)

client.on('disconnect', () => {
    client.connect()
})

client.connect()

module.exports.send = async (command) => {
    client.executeCommand(command)
}