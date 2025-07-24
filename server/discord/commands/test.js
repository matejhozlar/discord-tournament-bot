import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("test")
  .setDescription("Send a test message");

export async function execute(interaction) {
  return await interaction.reply({
    content: "Hello!",
  });
}
