const xppercoin = 350;

const handler = async (m, { conn, command, args }) => {
  let emojiSuccess = '💥'
  let emojiFail = '⚠️'
  let moneda = '💸'

  let user = global.db.data.users[m.sender]
  let countRaw = command.replace(/^buy/i, '') // extraer si dicen buyall o buy5 etc
  let count = countRaw
    ? /all/i.test(countRaw)
      ? Math.floor(user.exp / xppercoin)
      : parseInt(countRaw)
    : args[0]
    ? parseInt(args[0])
    : 1
  count = Math.max(1, count)

  if (user.exp >= xppercoin * count) {
    user.exp -= xppercoin * count
    user.coin += count

    let totalXP = xppercoin * count

    conn.reply(
      m.chat,
      `╔════════════⩽✰⩾════════════╗
║         𝐂𝐨𝐦𝐩𝐫𝐚 𝐄𝐱𝐢𝐭𝐨𝐬𝐚 ${emojiSuccess}        
╠════════════⩽✰⩾════════════╝
║╭─────────────────────────┄
║│ ✨ *Items adquiridos:* +${count} ${moneda}
║│ 🔥 *XP gastado:* -${totalXP} XP
║│
║│ 💡 ¡Sigue subiendo y consiguiendo más XP para comprar lo que quieras!
║╰─────────────────────────┄
╚════════════⩽✰⩾════════════╝`,
      m
    )
  } else {
    conn.reply(
      m.chat,
      `${emojiFail} ¡Oops! No tienes suficiente *XP* para comprar *${count} ${moneda}*.\n` +
        `Tu XP actual: *${user.exp} XP*\n` +
        `Necesitas: *${xppercoin * count} XP* para esa compra.`,
      m
    )
  }
}

handler.help = ['buy <cantidad>', 'buyall']
handler.tags = ['economy']
handler.command = ['buy', 'buyall']
handler.group = true
handler.register = true

export default handler
