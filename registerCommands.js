require("dotenv/config");
const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  REST,
  Routes,
} = require("discord.js");

const commandsData = [
  new ContextMenuCommandBuilder()
    .setName("User Information")
    .setType(ApplicationCommandType.User),
  new ContextMenuCommandBuilder()
    .setName("Translate message")
    .setType(ApplicationCommandType.Message),
];

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Refreshing context menu commands");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commandsData,
    });

    console.log("Successfully registered context menu commands.");
  } catch (error) {
    console.log(error);
  }
})();
