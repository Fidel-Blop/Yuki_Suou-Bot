const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {
  const loading = `
╔════◆◇◆════╗
┃  ⚙️  CARGANDO PIROPO...  ⚙️
╚════◆◇◆════╝
⏳ Espere un momento, seguridad revisando base de datos emocional...
`;

  const resultado = `
*┏━━━✦❘༻༺❘✦━━━┓*
💘 𝙿𝙸𝚁𝙾𝙿𝙾 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙰𝙳𝙾 💘
❝ ${pickRandom(global.piropo)} ❞
*┗━━━✦❘༻༺❘✦━━━┛*

👁 Recuerda: los animatrónicos también tienen sentimientos...
`;

  await conn.reply(m.chat, loading, m)
  await conn.reply(m.chat, resultado, m)
}

handler.help = ['piropo']
handler.tags = ['fun']
handler.command = ['piropo']
handler.fail = null
handler.exp = 10
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
