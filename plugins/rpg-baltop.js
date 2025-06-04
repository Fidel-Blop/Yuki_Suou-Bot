let handler = async (m, { conn, args, participants }) => {
  let emoji = '👁️‍🗨️'
  let moneda = 'soulcoins'

  // Filtramos usuarios solo del grupo actual
  let groupUsers = participants.map(p => p.jid)
  let users = Object.entries(global.db.data.users)
    .filter(([jid, user]) => groupUsers.includes(jid))
    .map(([jid, data]) => ({ ...data, jid }))

  if (!users.length) {
    await conn.reply(m.chat, `🔍 No hay rastros económicos registrados en este grupo... 👻`, m)
    return
  }

  let sorted = users.sort((a, b) => ((b.coin || 0) + (b.bank || 0)) - ((a.coin || 0) + (a.bank || 0)))
  let len = args[0] ? Math.min(10, Math.max(parseInt(args[0]), 1)) : Math.min(10, sorted.length)

  let text = `📜 *TABLERO DE ALMAS ACUMULADAS*\n${emoji} Los más ricos (o los más peligrosos)... del grupo:\n\n`

  text += sorted.slice(0, len).map(({ jid, coin, bank }, index) => {
    let total = (coin || 0) + (bank || 0)
    let rank = index + 1
    let name = conn.getName(jid)
    return `🎖️ *${rank}.* ${name} \n   💰 Total: *¥${total} ${moneda}*`
  }).join('\n\n')

  text += `\n\n💀 *¿Quién será el siguiente en subir... o desaparecer?*`

  await conn.reply(m.chat, text.trim(), m, { mentions: participants.map(p => p.jid) })
}

handler.help = ['baltop']
handler.tags = ['rpg']
handler.command = ['baltop', 'topbanco', 'topdinero']

export default handler
