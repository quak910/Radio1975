module.exports = {
  name: "stop",
  aliases: ["dis"],
  category: "music",

  run: async(client, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bạn không có quyền')
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('Bạn phải tham gia kênh âm thoại!');
    let queue = message.client.queue.get(message.guild.id)
    if(!queue) return message.channel.send({
        embed: {
            description: 'Không có gì đang phát để dừng!',
            color: 'BLACK'
        }
    })
    message.react('✅')
    queue.songs = []
    queue.connection.dispatcher.end('Đã dừng!')
    message.guild.me.voice.channel.leave()
}}
