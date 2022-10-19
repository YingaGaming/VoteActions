const NodeRSA = require('node-rsa')
const { generateKeyPair, X509Certificate } = require('crypto')
const fs = require('fs')

console.log('Generating Keypair...')

generateKeyPair('rsa', {
    modulusLength: 1024,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    }
}, (err, publicKey, privateKey) => {
    if (err) {
        console.error(err)
        process.exit()
    }
    fs.writeFileSync('./private.key', privateKey)
    fs.writeFileSync('./public.key', publicKey)
});

return

let key = new NodeRSA({
    b: 2048,
    encryptionScheme: 'pkcs1'
});

//key = key.generateKeyPair()

let private = key.exportKey('pkcs1')

let public = key.exportKey('pkcs1-public')
    .split('-----BEGIN RSA PUBLIC KEY-----').join('')
    .split('-----END RSA PUBLIC KEY-----').join('')
    .split('\n').join('')

fs.writeFileSync('./private.key', private)
fs.writeFileSync('./public.key', public)

console.log('Keypair Generated!')