let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users
  let senderId = m.sender
  let senderName = conn.getName(senderId)

  let tiempo = 5 * 60 // 5 minutos
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
    m.reply(`🕯️ *ALERTA DE RASTRO FANTASMA*\n\n🔒 Ya cometiste un crimen recientemente, las cámaras todavía detectan tu esencia... ⏱️ *${tiempo2}* antes de que puedas volver a actuar sin ser detectado.\n\n🎥 Recuerda: los errores se graban... 👁️`)
    return
  }

  cooldowns[m.sender] = Date.now()

  let senderCoin = users[senderId].coin || 0
  let randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  while (randomUserId === senderId) {
    randomUserId = Object.keys(users)[Math.floor(Math.random() * Object.keys(users).length)]
  }
  let randomUserCoin = users[randomUserId].coin || 0
  let minAmount = 15
  let maxAmount = 50
  let amountTaken = Math.floor(Math.random() * (maxAmount - minAmount + 1)) + minAmount
  let randomOption = Math.floor(Math.random() * 3)

  switch (randomOption) {
    case 0:
      users[senderId].coin += amountTaken
      users[randomUserId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `🎭 *CRIMEN EXITOSO: CAMINO SIN RETORNO*\n\n💰 Robaste *${amountTaken} monedas* a @${randomUserId.split("@")[0]}.\n🕵️‍♂️ Nadie sospechó... esta vez.\n\n📍 *Consejo del Vigilante Nocturno:* La avaricia llama a los espectros del pasado.`,
        mentions: [randomUserId]
      })
      break

    case 1:
      users[senderId].coin -= amountTaken
      conn.sendMessage(m.chat, {
        text: `🚨 *CRIMEN FALLIDO: EL VIGILANTE TE VIO*\n\n💸 Has perdido *${amountTaken} monedas* intentando robar a @${randomUserId.split("@")[0]}.\n🎙️ La radio estática murmura tu nombre...\n\n⚠️ *Advertencia:* Estás en la lista negra del Freddy FazBanco.`,
        mentions: [randomUserId]
      })
      break

    case 2:
      conn.sendMessage(m.chat, {
        text: `🕵️‍♀️ *ALGO NO SALIÓ BIEN... PERO TAMPOCO MAL*\n\n🎲 Intentaste robar a @${randomUserId.split("@")[0]}, pero algo... *interrumpió* tu crimen.\n\n🕯️ *Quizá fue suerte... o un mensaje desde el otro lado.*`,
        mentions: [randomUserId]
      })
      break
  }
}

handler.help = ['crimen']
handler.tags = ['rpg']
handler.command = ['crimen']
handler.cooldown = 300

export default handler

function segundosAHMS(segundos) {
  segundos = Number(segundos)
  const h = Math.floor(segundos / 3600)
  const m = Math.floor((segundos % 3600) / 60)
  const s = Math.floor((segundos % 3600) % 60)
  return [
    h > 0 ? `${h}h` : '',
    m > 0 ? `${m}m` : '',
    s > 0 ? `${s}s` : ''
  ].filter(Boolean).join(' ')
}
