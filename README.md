# VoteActions
Easily handle votes for your Minecraft server

### What's this?
VoteActions allows you to run custom actions whenever someone votes for your Minecraft server on a server list website, using the [Votifier](https://github.com/vexsoftware/votifier) protocol.

You do not need to run any plugins on your server for this to work!

### Features
- Different actions for different vote amounts
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

### Credits
- Player head images provided by [Crafatar](https://crafatar.com)
- Votifier protocol implementation by [node-votifier](https://github.com/VeltroGaming/votifier) (We use [our own fork](https://github.com/YingaGaming/votifier))