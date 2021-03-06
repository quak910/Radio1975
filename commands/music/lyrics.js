const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
module.exports = {
    name: "lyrics",
    aliases: ["l"],
    category: "music",
    run: async(client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Không có gì đang phát.").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Không thấy lyrics cho ${queue.songs[0].title} :(`;
    } catch (error) {
      lyrics = `Không tìm thấy lyrics cho ${queue.songs[0].title} :(`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`Lyrics cho ${queue.songs[0].title}`)
      .setDescription(lyrics)
      .setColor("GREEN")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
