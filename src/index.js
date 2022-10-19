const fs = require('fs')
const votemanager = require('./votemanager')

const config = require('../config')

if (!fs.existsSync('./private.pem')) {
    console.log('RSA private key not found! Please make sure to put it as "private.pem" into the root directory, or generate a new one using "npm run keygen"')
    process.exit()
}

const votifier = require("@yinga-gaming/votifier")(__dirname + "/../private.pem", config.port);

votifier.on('vote', function(username, server, ip, date) {
    votemanager.vote(username)
})

votifier.on('error', err => {
    console.error(err)
})