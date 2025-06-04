async function handler(m, { conn, args, usedPrefix, command }) {
  const emoji = '🎁'
  const emoji2 = '🚫'
  const emoji3 = '💳'
  const emoji4 = '✅'
  const moneda = 'monedas'
  const user = global.db.data.users[m.sender]
  const type = 'coin'
  const bankType = 'bank'

  if (!args[0] || !args[1]) {
    const helpMessage = `${emoji} *¿A quién le vas a transferir tus ${moneda}?*\n\n📌 Ejemplo: *${usedPrefix + command} 25000 @usuario*\n🎪 Asegúrate de mencionar correctamente al guardia nocturno.`;
    return conn.sendMessage(m.chat, { text: helpMessage, mentions: [m.sender] }, { quoted: m })
  }

  const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(100, (isNumber(args[0]) ? parseInt(args[0]) : 100))) * 1
  const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[1] ? (args[1].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''

  if (!who) {
    return conn.sendMessage(m.chat, { text: `${emoji2} *Debes regalar al menos 100 ${moneda}*, no seas codo como Freddy.`, mentions: [m.sender] }, { quoted: m })
  }

  if (!(who in global.db.data.users)) {
    return conn.sendMessage(m.chat, { text: `${emoji2} *El usuario que mencionaste no está en el universo de Freddy Fazbear’s.* 👻`, mentions: [m.sender] }, { quoted: m })
  }

  if (user[bankType] * 1 < count) {
    return conn.sendMessage(m.chat, { text: `${emoji3} *¡Te falta cash en el banco!*\n💼 No tienes suficientes *${moneda}* guardadas.`, mentions: [m.sender] }, { quoted: m })
  }

  user[bankType] -= count
  global.db.data.users[who][type] += count

  const nombreQuienRecibe = await conn.getName(who)
  const nombreQuienEnvía = await conn.getName(m.sender)

  return conn.sendMessage(m.chat, {
    text: `${emoji4} *¡Transferencia exitosa!* 🎉\n\n🧍‍♂️ ${nombreQuienEnvía} le dio *${count.toLocaleString()} ${moneda}* a @${who.split('@')[0]}.\n💬 “Cuídalas bien o te las roba Balloon Boy 😈”`,
    mentions: [m.sender, who]
  }, { quoted: m })
}

handler.help = ['transferir <cantidad> @usuario']
handler.tags = ['economía']
handler.command = ['transferir', 'dar', 'regalar']
handler.group = true
handler.register = true

export default handler

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
