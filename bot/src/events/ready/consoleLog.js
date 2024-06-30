const { ActivityType } = require("discord.js");

module.exports = (client) => {
  console.log(`${client.user.tag} is online.`);

  let status = [
    {
      name: "EURO 2024",
      type: ActivityType.Watching,
    },
    {
      name: "COPA AMERICA 2024",
      type: ActivityType.Watching,
    },
  ];

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
};
