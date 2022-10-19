module.exports = {

    // The port to listen on. 8192 by default.
    port: 8192,

    database: {
        url: 'mongodb://127.0.0.1:27017',
        name: 'VoteActions'
    },

    rcon: {
        host: '127.0.0.1',
        port: 25575,
        password: 'VerySecurePassword'
    },

    actions: [
        {
            id: 'example', // Unique ID for the action
            count: 30, // Amount of votes before triggering
            timeframe: 30, // How long before resetting vote count (days)

            // Commands to run on the server
            //
            // Placeholders:
            // %player%     |   Player name
            // %count%      |   Current vote count
            // %total%      |   Total amount of votes
            commands: [
                "say %player% voted %count% times this month, and %total% times in total!"
            ]
        }
    ]

}