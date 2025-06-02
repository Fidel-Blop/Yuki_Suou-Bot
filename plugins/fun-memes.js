import hispamemes from 'hispamemes'

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const meme = await hispamemes.meme()
    const caption = `*🎭 MEME ENTREGADO POR FREDDY FAZBEAR™️*\n\nPrepárate para reír... antes de que apaguen las luces.`
    await conn.sendFile(m.chat, meme, 'meme.jpg', caption, m)
    await m.react('👻') // Reacción estilo FNaF
  } catch (e) {
    await m.reply('💀 Error... parece que Foxy desconectó el servidor de memes.')
  }
}

handler.help = ['meme', 'memes']
handler.tags = ['fun']
handler.command = ['meme', 'memes']
handler.coin = 1
handler.group = true
handler.register = true

export default handler
