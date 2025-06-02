const palabras = [
  "gato", "perro", "pajaro", "elefante", "tigre", "ballena", "mariposa",
  "tortuga", "conejo", "rana", "pulpo", "ardilla", "jirafa", "cocodrilo",
  "pinguino", "delfin", "serpiente", "hamster", "mosquito", "abeja",
  "television", "computadora", "botsito", "reggaeton", "economia",
  "electronica", "facebook", "whatsapp", "instagram", "tiktok",
  "milanesa", "presidente", "bot", "peliculas"
]

const intentosMaximos = 6
const gam = new Map()

function elegirPalabraAleatoria() {
  return palabras[Math.floor(Math.random() * palabras.length)]
}

function ocultarPalabra(palabra, letrasAdivinadas) {
  return palabra.split('').map(letra => letrasAdivinadas.includes(letra) ? letra : "_").join(' ')
}

function mostrarAhorcado(intentos) {
  const partes = [
    " ____",
    " |  |",
    intentos < 6 ? " |  O" : " |",
    intentos < 5 ? " | /" : intentos < 4 ? " | /|" : intentos < 3 ? " | /|\\" : " |",
    intentos < 2 ? " | /" : intentos < 1 ? " | / \\" : " |",
    "_|_"
  ]
  return partes.slice(0, intentosMaximos - intentos + 1).join("\n")
}

function juegoTerminado(sender, mensaje, palabra, letrasAdivinadas, intentos) {
  if (intentos <= 0) {
    gam.delete(sender)
    return `❌ ¡Perdiste! La palabra correcta era: *${palabra}*\n\n${mostrarAhorcado(intentos)}`
  } else if (!mensaje.includes("_")) {
    let expGanada = palabra.length >= 8 ? Math.floor(Math.random() * 3500 + 1500) : Math.floor(Math.random() * 400 + 100)
    global.db.data.users[sender].exp += expGanada
    gam.delete(sender)
    return `🎉 ¡Ganaste! Adivinaste la palabra *${palabra}*.\n\n*Has ganado:* ${expGanada} Exp`
  } else {
    return `${mostrarAhorcado(intentos)}\n\n${mensaje}`
  }
}

let handler = async (m, { conn }) => {
  if (gam.has(m.sender)) {
    return conn.reply(m.chat, "🕹️ Ya tienes un juego en curso. ¡Termina ese primero!", m)
  }

  const palabra = elegirPalabraAleatoria()
  const letrasAdivinadas = []
  const intentos = intentosMaximos
  const mensaje = ocultarPalabra(palabra, letrasAdivinadas)

  gam.set(m.sender, { palabra, letrasAdivinadas, intentos })

  let texto = `🎮 *Ahorcado* 🎮\n\nAdivina la palabra:\n${mensaje}\n\nIntentos restantes: ${intentos}`
  conn.reply(m.chat, texto, m)
}

handler.before = async (m, { conn }) => {
  const juego = gam.get(m.sender)
  if (!juego) return

  const { palabra, letrasAdivinadas } = juego
  let intentos = juego.intentos

  if (m.text.length === 1 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/.test(m.text)) {
    const letra = m.text.toLowerCase()
    if (!letrasAdivinadas.includes(letra)) {
      letrasAdivinadas.push(letra)
      if (!palabra.includes(letra)) intentos--
    }

    const mensaje = ocultarPalabra(palabra, letrasAdivinadas)
    const resultado = juegoTerminado(m.sender, mensaje, palabra, letrasAdivinadas, intentos)

    if (resultado.includes("¡Ganaste!") || resultado.includes("¡Perdiste!")) {
      conn.reply(m.chat, resultado, m)
    } else {
      gam.set(m.sender, { palabra, letrasAdivinadas, intentos })
      conn.reply(m.chat, `${resultado}\n\nIntentos restantes: ${intentos}`, m)
    }
  } else {
    conn.reply(m.chat, "❗ Ingresa solo *una letra* a la vez.", m)
  }
}

handler.help = ['ahorcado']
handler.tags = ['game']
handler.command = ['ahorcado']
handler.group = true
handler.register = true

export default handler
