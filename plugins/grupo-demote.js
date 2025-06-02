var handler = async (m, { conn, usedPrefix, command, text }) => {
  const emoji = '🛠️'
  const alert = '🚨'
  const success = '📉'
  const denied = '❗'

  let number
  if (!isNaN(text)) {
    number = text
  } else if (text && text.match(/@/g)) {
    number = text.split`@`[1]
  }

  if ((!text && !m.quoted) || (number && (number.length > 13 || number.length < 11))) {
    return conn.reply(m.chat, `${denied} *Protocolo inválido...*\n\nDebes *mencionar o responder* al usuario que deseas degradar de su rol como administrador.`, m)
  }

  try {
    let user
    if (text) {
      user = number + '@s.whatsapp.net'
    } else if (m.quoted?.sender) {
      user = m.quoted.sender
    } else if (m.mentionedJid?.length) {
      user = m.mentionedJid[0]
    }

    if (!user) throw 'Usuario no identificado.'

    await conn.groupParticipantsUpdate(m.chat, [user], 'demote')

    conn.reply(m.chat, `${success} *Acceso de administrador revocado.*\n\nEl sujeto ha sido degradado desde la sala de control central.\n\n🧍 Rol actual: *Tripulante estándar Fazbear*`, m)

  } catch (e) {
    conn.reply(m.chat, `${alert} *Error al ejecutar el protocolo de degradación.*\nVerifica que el usuario exista o esté en el grupo.`, m)
  }
}

handler.help = ['demote']
handler.tags = ['grupo']
handler.command = ['demote', 'quitarpija', 'degradar']
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler
