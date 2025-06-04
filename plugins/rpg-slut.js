let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let emoji = '💋'
  let emoji2 = '⏳'
  let emoji3 = '🚫'
  let moneda = '💸'

  let users = global.db.data.users
  let senderId = m.sender
  let senderName = await conn.getName(senderId)

  let tiempo = 5 * 60 // 5 minutos
  if (cooldowns[senderId] && Date.now() - cooldowns[senderId] < tiempo * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[senderId] + tiempo * 1000 - Date.now()) / 1000))
    return m.reply(`${emoji2} ¡Hey ${senderName}! Debes esperar *${tiempoRestante}* para usar de nuevo el comando *#slut* 🔞`)
  }
  cooldowns[senderId] = Date.now()

  let senderCoin = users[senderId].coin || 0
  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  }

  let randomUserName = await conn.getName(randomUserId)
  let randomUserCoin = users[randomUserId].coin || 0
  let minAmount = 15
  let maxAmount = 50
  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
  let resultado = Math.floor(Math.random() * 3)

  switch (resultado) {
    case 0:
      users[senderId].coin += amountTaken
      users[randomUserId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `╔══🎪 𝐒𝐥𝐮𝐭 𝐌𝐨𝐝𝐞 𝐀𝐜𝐭𝐢𝐯𝐚𝐝𝐨 🎪══╗
║ 👄 @${senderId.split('@')[0]} le hizo un favor indecente a @${randomUserId.split('@')[0]}...
║ 💵 Y recibió *${amountTaken} ${moneda}* por sus... talentos 😏
║ 😵 ¡@${randomUserId.split('@')[0]} quedó seco y confundido!
╚═══════════════════════════╝`,
        mentions: [senderId, randomUserId]
      })
      break

    case 1:
      users[senderId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `╔══💔 𝐃𝐞𝐬𝐭𝐢𝐧𝐨 𝐂𝐫𝐮𝐞𝐥 💔══╗
║ 😓 @${senderId.split('@')[0]} lo intentó con estilo...
║ ❌ Pero acabó pagando *${amountTaken} ${moneda}* por rechazo emocional 😭
║ 🧼 ¡Mejor suerte la próxima vez!
╚═══════════════════════════╝`,
        mentions: [senderId]
      })
      break

    case 2:
      conn.sendMessage(m.chat, {
        text: `╔══🛑 𝐈𝐧𝐭𝐞𝐧𝐭𝐨 𝐅𝐚𝐥𝐥𝐢𝐝𝐨 🛑══╗
║ 🫢 @${senderId.split('@')[0]} lo intentó pero...
║ 🙅 Nadie cayó esta vez. ¡Cero ganancia!
║ 📉 Ni monedas, ni dignidad ganadas 😅
╚═══════════════════════════╝`,
        mentions: [senderId]
      })
      break
  }
}

handler.help = ['slut']
handler.tags = ['rpg']
handler.command = ['slut']
handler.group = true
handler.register = true

export default handler
