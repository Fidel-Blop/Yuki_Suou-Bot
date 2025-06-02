const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {
  const fnaflogo = '🔧✨ FNaF LATAM SYSTEM'
  const fnafstylized = `🦊🔧 𝙁𝙉𝘼𝙁 𝙇𝘼𝙏𝘼𝙈 𝙈𝙊𝘿𝙐𝙇𝙀 𝘼𝘾𝙏𝙄𝙑𝙀𝘿 🐻🔦`

  await conn.reply(m.chat, `${fnaflogo}\n🎮 Generando consejo de supervivencia...`, m)

  const consejoElegido = pickRandom(global.consejo)

  const formato = `
*━━━━━━━━━━━━━━⬣*
💡 *CONSEJO DEL DÍA* 💡
*━━━━━━━━━━━━━━⬣*

📝 _"${consejoElegido}"_

🦾 Sistema: ${fnafstylized}
*━━━━━━━━━━━━━━⬣*`

  await conn.reply(m.chat, formato, m)
}

handler.help = ['consejo']
handler.tags = ['fun']
handler.command = ['consejo']
handler.fail = null
handler.exp = 10
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
