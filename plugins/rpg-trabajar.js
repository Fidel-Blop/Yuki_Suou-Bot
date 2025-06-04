let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
  let emoji = '💼'
  let emoji2 = '💸'
  let emoji3 = '⏳'
  let moneda = 'monedas'

  let user = global.db.data.users[m.sender]
  let senderName = await conn.getName(m.sender)
  let tiempo = 5 * 60 // 5 minutos

  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
    return conn.reply(m.chat, `❌ ${emoji3} *${senderName}*, ya chambeaste hace poco.\n⏱️ Vuelve en *${tiempoRestante}* para seguirle metiendo duro.`, m)
  }

  let ganancias = Math.floor(Math.random() * 500)
  cooldowns[m.sender] = Date.now()
  user.coin += ganancias

  let trabajoElegido = pickRandom([
    '🧹 Barriste los pasillos embrujados de Freddy Fazbear’s 🍕',
    '🧑‍🍳 Cocinaste pizzas para los animatrónicos con hambre 😋',
    '👷 Arreglaste los cables de seguridad con miedo al susto 👻',
    '🧑‍🎨 Pintaste los posters vintage del show 🎨',
    '🔧 Reparaste a Foxy antes de que se enoje 😡',
    '🛠️ Le diste mantenimiento al generador (casi te electrocuta) ⚡',
    '🎭 Actuaste en el show nocturno como animatrónico 🐻',
    '🧼 Limpiando vómito de niño asustado... asquito 🤢',
    '🕹️ Atendiste las maquinitas arcade como buen gamer 🎮'
  ])

  await conn.reply(m.chat, `
╔═════🎪 𝙁𝙉𝘼𝙁 𝙇𝘼𝙏𝘼𝙈 𝙒𝙊𝙍𝙆 🎪═════╗
┃ ${emoji} *Trabajo Realizado:*
┃ ${trabajoElegido}
┃ 
┃ ${emoji2} *Ganancia:* +${toNum(ganancias)} ${moneda}
╚════════════════════════╝`, m)
}

handler.help = ['trabajar']
handler.tags = ['economy']
handler.command = ['w','work','chambear','chamba','trabajar']
handler.group = true
handler.register = true

export default handler

function toNum(number) {
  if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number <= -1000 && number > -1000000) {
    return (number / 1000).toFixed(1) + 'k'
  } else if (number <= -1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return number
  }
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function segundosAHMS(segundos) {
  segundos = Number(segundos)
  const h = Math.floor(segundos / 3600)
  const m = Math.floor((segundos % 3600) / 60)
  const s = Math.floor((segundos % 3600) % 60)
  return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm ' : ''}${s}s`
}
