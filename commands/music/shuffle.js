module.exports = {
  name: "shuffle",
  aliases: ["sf"],
  category: "music",
  run: async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bạn không có quyền')
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('Bạn phải tham gia kênh âm thoại!');
    const queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send('Không có gì đang phát để trộn lẫn')
    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    message.channel.send(`Đã trộn lẫn các bài 🔀`).catch(console.error);
}}
