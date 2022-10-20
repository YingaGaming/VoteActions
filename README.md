# VoteActions
Easily handle votes for your Minecraft server

### What's this?
VoteActions allows you to run custom actions whenever someone votes for your Minecraft server on a server list website, using the [Votifier](https://github.com/vexsoftware/votifier) protocol.

You do not need to run any plugins on your server for this to work!

### Features
- Different actions for different vote amounts within a specified timeframe
- Run commands via RCON
- Discord Notifications
- Run custom JavaScript

### Setup
Requirements:
- NodeJS 18+
- Minecraft Server with RCON enabled

Setup:
- Clone the repository
- Install dependencies with ``npm install``
- Copy ``config.default.js`` to ``config.js``
- Configure ``config.js`` to your liking (Everything is explained with comments)
- Generate your encryption keys with ``npm run keygen``
- Start VoteActions with ``npm start``

Your public key is in the ``public.pem`` file! This is what you put into your serverlist sites!
**NEVER** share ``private.pem``, or others will be able to trigger actions without actually voting!

### Troubleshooting
**I'm trying to connect my server listing, but it says the public key is invalid!**
Some sites want keys in a different format (because who needs standards anyway). Try removing the header lines (the ones with a bunch of dashes) and removing all line breaks. If that doesn't work, you'll need to figure out how the site wants the key yourself. You may need to ask around.

**The commands I have set are not being executed!**
Make sure your RCON info is valid. Have a look in the server.properties of your Minecraft server. Is RCON enabled? On which port? Is the password correct?

### Credits
- Player head images provided by [Crafatar](https://crafatar.com)
- Votifier protocol implementation by [node-votifier](https://github.com/VeltroGaming/votifier) (We use [our own fork](https://github.com/YingaGaming/votifier))