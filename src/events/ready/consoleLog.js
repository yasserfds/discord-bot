const { ActivityType } = require('discord.js')

let status = [
    {
        name: 'Youtube',
        type: ActivityType.Watching
    }
]

module.exports = (client) => {
    console.log(`${client.user.tag} is online.`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random])
    }, 1000)
};