const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "bt-rst",
  aliases: ["restartbot"],
  category: "! Just for quak#4951",
  run: async (client, message, args) => {
    
    await client.destroy();
    await client.login(config.TOKEN);
    await message.channel.send(
      new Discord.MessageEmbed().setDescription("Bot đã khởi động lại.....")
    );
  },
};
