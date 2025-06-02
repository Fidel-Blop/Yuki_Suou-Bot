var handler = async (m, { conn, command, text }) => {

  if (!text) return conn.reply(m.chat, '🔦 *Freddy escanea pero no detecta nombre...*\n\n💬 _Ingresa el nombre de la víctima... digo... persona._', m)

  let personalidad = `📊 *ANÁLISIS COMPLETO - Freddy Fazbear's Systems™*\n
🔎 \`Nombre\` : *${text}*
🔋 \`Buena Moral\` : ${pickRandom(valores)}
☠️ \`Mala Moral\` : ${pickRandom(valores)}
🎭 \`Tipo de Persona\` : ${pickRandom([
'Animatrónico disfrazado',
'Niño del Llanto',
'De buen corazón',
'Antisocial',
'Poseído por Marioneta',
'Extraño',
'Fan de FNaF',
'Peligroso pero adorable',
'Cristal',
'Un glitch',
'Error 404: personalidad no encontrada',
'Error en base de datos de Freddy™'
])}
🎬 \`Siempre\` : ${pickRandom([
'Viendo las cámaras',
'Huyendo de Springtrap',
'Tomando café en la oficina de seguridad',
'Sospechando de todos',
'Sin batería',
'En shock por el susto de Bonnie',
'Chateando porque nadie lo visita en la pizzería',
'Rompiendo reglas de la noche',
'Cantando con Freddy',
'Asustando novatos'
])}
🧠 \`Inteligencia\` : ${pickRandom(valores)}
🤡 \`Nivel de Pendejez\` : ${pickRandom(valores)}
🐢 \`Morosidad\` : ${pickRandom(valores)}
🔥 \`Coraje\` : ${pickRandom(valores)}
👻 \`Miedo\` : ${pickRandom(valores)}
🌟 \`Fama\` : ${pickRandom(valores)}
⚧️ \`Género\` : ${pickRandom([
'Hombre',
'Mujer',
'Endoesqueleto sin disfraz',
'Feminista poseída',
'Hetero.exe',
'Chico de la Mordida del 87',
'No Binario pero con jumpscare',
'BonnieSexual',
'FoxyRomántico',
'Género: Marioneta',
'GlitchTrap Friendly',
'Purple Guy™️',
'FreddyFazSexual'
])}`

  conn.reply(m.chat, personalidad, m)
}

handler.help = ['personalidad']
handler.tags = ['fun']
handler.command = ['personalidad']
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

const valores = [
  '0%', '1%', '2.9%', '6%', '12%', '20%', '27%',
  '35%', '41%', '49%', '54%', '60%', '66%',
  '73%', '78%', '84%', '92%', '93%', '94%',
  '96%', '98.3%', '99.7%', '99.9%', '100%', '💀 Desconocido'
]
