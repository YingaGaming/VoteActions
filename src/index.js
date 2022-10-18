const Votifier = require('votifier-server')
const fs = require('fs')

const config = require('../config')

if (!fs.existsSync('./private.key')) {
    console.log('RSA private key not found! Please make sure to put it as "private.key" into the root directory, or generate a new one using "npm run keygen"')
}

let privateKey = fs.readFileSync('./private.key', 'utf-8')

let votifier = new Votifier(privateKey, config.port)

votifier.on('vote', function(username, server, ip, date) {
    console.log(username);
    console.log(server);
    console.log(ip);
    console.log(date);
})