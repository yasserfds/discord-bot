const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {client} Client
   * @param {Interaction} interaction
   */

  name: "kick",
  description: "kick a member from the server.",
  options: [
    {
      name: "target-user",
      description: "The user you want to kick",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "reason",
      description: "Reason to kick.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    (permissionsRequired = [PermissionFlagsBits.KickMembers]),
    (botPermission = [PermissionFlagsBits.KickMembers]),
  ],

  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply({
        content: "You can only run this command inside a server.",
        ephemeral: true,
      });
      return;
    }

    const targetUser =
      interaction.options.get("target-user")?.value || interaction.member.id;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided.";

    await interaction.deferReply();

    if (!targetUser) {
      await interaction.editReply(
        "The user you want to kick doesn't exist in the server."
      );
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.reply("I can't kick this user because he's the owner.");
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosisiton =
      interaction.guild.members.me.roles.highest.position;

    try {
      if (targetUserRolePosition >= requestUserRolePosition) {
        await interaction.reply(
          "I can't kick that user because they have the same/higher role than me."
        );
        return;
      }

      // when the bot has the same role
      if (targetUserRolePosition <= botRolePosisiton) {
        await interaction.reply(
          "I can't kick that user because they have the same/higher role than me"
        );
        return;
      }

      // Kick the target user
      await targetUser.kick({
        reason,
      });
      await interaction.editReply(
        `User ${targetUser} was kicked\nReson: ${reason}`
      );
    } catch (error) {
      console.error(`There was an error when kicking: ${error}`);
    }
  },
};
