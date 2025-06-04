let cooldowns = {}

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let users = global.db.data.users[m.sender]
  let moneda = '💰 monedas';
  let emojiInfo = '🎰'
  let emojiSuccess = '✅'
  let emojiFail = '❌'
  let emojiWarn = '⚠️'

  const tiempoEspera = 10 // segundos

  // Control de cooldown
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    return conn.reply(m.chat, `${emojiWarn} *¡Calma, jugador!* Ya hiciste una apuesta hace poco.\nEspera *⏱ ${tiempoRestante}* para jugar otra vez.`, m)
  }
  cooldowns[m.sender] = Date.now()

  if (!text) return conn.reply(m.chat, `${emojiWarn} Debes ingresar una cantidad de ${moneda} y elegir un color para apostar.\n\nEjemplo:\n> *${usedPrefix + command} 20 red*\n> *${usedPrefix + command} 50 black*`, m)

  let args = text.trim().split(" ")
  if (args.length !== 2) return conn.reply(m.chat, `${emojiWarn} Formato incorrecto. Usa:\n> *${usedPrefix + command} <cantidad> <color>*\nEjemplo:\n> *${usedPrefix + command} 100 red*`, m)

  let coin = parseInt(args[0])
  let color = args[1].toLowerCase()

  if (isNaN(coin) || coin <= 0) return conn.reply(m.chat, `${emojiWarn} La cantidad debe ser un número válido y mayor a cero.`, m)

  if (coin > 10000) return conn.reply(m.chat, `${emojiWarn} La apuesta máxima es de *10,000 ${moneda}* para mantener la emoción.` , m)

  if (!(color === 'black' || color === 'red')) return conn.reply(m.chat, `${emojiWarn} Elige un color válido para apostar: *red* o *black*`, m)

  if (coin > users.coin) return conn.reply(m.chat, `${emojiFail} No tienes suficientes ${moneda} para apostar esa cantidad.\nSaldo actual: *${users.coin} ${moneda}*`, m)

  await conn.reply(m.chat, `${emojiInfo} Has apostado *${coin} ${moneda}* al color *${color.toUpperCase()}*.\n🎲 Preparando ruleta... ¡Suerte! 🍀\nEspera *⏱ 10 segundos* para el resultado.`, m)

  setTimeout(() => {
    let resultado = Math.random()
    let gana = false

    if (resultado < 0.5) {
      gana = color === 'black'
    } else {
      gana = color === 'red'
    }

    if (gana) {
      users.coin += coin
      conn.reply(m.chat, `${emojiSuccess} *¡Felicidades!* Ganaste *${coin} ${moneda}*.\n💰 Total: *${users.coin} ${moneda}*`, m)
    } else {
      users.coin -= coin
      conn.reply(m.chat, `${emojiFail} Perdiste la apuesta.\n🔻 Se descontaron *${coin} ${moneda}*.\n💰 Total: *${users.coin} ${moneda}*`, m)
    }
  }, 10000)
}

handler.tags = ['economy']
handler.help = ['ruleta *<cantidad> <color>*']
handler.command = ['ruleta', 'roulette', 'rt']
handler.register = true
handler.group = true 

export default handler

function segundosAHMS(segundos) {
  // Para esta ruleta solo mostramos segundos
  return `${segundos} segundos`
}
