module.exports = {

    // The port to listen on. 8192 by default.
    port: 8192,

    // Connection info of a MongoDB database
    database: {
        url: 'mongodb://127.0.0.1:27017',
        name: 'VoteActions'
    },

    // Connection info for RCON (make sure to configure it in your server.properties file)
    rcon: {
        host: '127.0.0.1',
        port: 25575,
        password: 'VerySecurePassword'
    },

    // Webhook URL for sending Discord notifications (optional)
    discordWebhook: '',

    // Checks if usernames belong to actual players. Disable this if you're using GeyserMC or similar.
    //
    // If disabled, the UUID of Geyser players will be set to their username. Keep this in mind when defining actions.
    // This also means that Geyser players do not keep their votes when changing their username.
    // Also, votes may be "stolen" when player A changes their name and player B changes their name to the original name of player A.
    // Also also, make sure that the serverside plugins used by your actions can handle unknown usernames.
    checkUUID: true,

    // After how many days the vote count should reset. Based on last reset per player. Does not affect total count.
    timeframe: 30,

    // Actions to run on specified amount of votes within timeframe (0 = always, if no other action applies)
    actions: {
        0: {
            // Commands to run on the server
            //
            // Placeholders:
            // %player%     |   Player name
            // %uuid%       |   UUID of the player
            // %count%      |   Current vote count
            // %total%      |   Total amount of votes
            commands: [
                "say %player% voted %count% times this month, and %total% times in total!"
            ],

            // Runs a custom function
            //
            // DO NOT BLINDLY PASTE STUFF INTO HERE!
            // This function is run as-is! Without checks, and not sandboxed!
            // We are not responsible if any reverse shells or similar suddenly appear on your server because of this!
            //
            // You can use require() to hook into existing source code or load modules.
            // For example, to send an RCON command:
            // require('./src/rcon').send('say Hello There!')
            //
            // If you're using lots of custom actions (or large ones), you can organize them by putting them into a folder as separate files 
            // and just redirecting to there with something like: require('./custom-actions/myaction').run(player, data)
            //
            // player           |   String  |   Username of the player
            // data             |   Object  |   Player data
            // data.uuid        |   String  |   UUID of the player
            // data.count       |   Number  |   Current vote count
            // data.total       |   Number  |   Total vote count
            // data.last        |   Number  |   Timestamp of the last vote
            // data.lastReset   |   Number  |   Timestamp of the last reset
            custom: (player, data) => {
                console.log(`${player} voted ${data.count} times!`)
            },

            // Message data for Discord notifications
            // Make sure to set "discordWebhook" above if using this
            //
            // If you don't know how to use this, check out https://leovoel.github.io/embed-visualizer/ (enable webhook mode)
            //
            // Placeholders:
            // %player%     |   Player name
            // %uuid%       |   UUID of the player
            // %count%      |   Current vote count
            // %total%      |   Total amount of votes
            // %avatar%     |   URL of player head image
            // %timestamp%  |   Current timestamp, already formatted for Discord
            discord: {
                "embeds": [{
                    "title": "New Vote!",
                    "description": "This person has voted! You should too!",
                    "color": 9121513,
                    "timestamp": "%timestamp%",
                    "thumbnail": {
                        "url": "https://purepng.com/public/uploads/medium/heart-icon-lot.png"
                    },
                    "author": {
                        "name": "%player%",
                        "icon_url": "%avatar%"
                    },
                    "fields": [{
                            "name": "This Month",
                            "value": "%count%"
                        },
                        {
                            "name": "Total",
                            "value": "%total%"
                        }
                    ]
                }]
            }

        }
    }

}