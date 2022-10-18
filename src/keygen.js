const NodeRSA = require('node-rsa')
const fs = require('fs')

console.log('Generating Keypair...')

const key = new NodeRSA({
    b: 2048,
    encryptionScheme: 'pkcs1'
});

let private = key.exportKey('pkcs1-private')
let public = key.exportKey('pkcs1-public')

fs.writeFileSync('./private.key', private)
fs.writeFileSync('./public.key', public)

console.log('Keypair Generated!')